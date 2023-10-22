import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import bcrypt from "bcryptjs";
import { appOptions, randomAvatar } from "@/lib/Constants";
import { createServerLog, validateRecaptcha } from "@/server/serverUtils";
import { v4 as uuidv4 } from "uuid";
import {
  addSubscriptionCredits,
  creditsPerPlan,
} from "./routeUtils/StripeUsageUtils";
import { addMonths, subMinutes } from "date-fns";
import { postToTelegramGroup } from "@/utils/TelegramUtils";
import { validatePasswordRecovery } from "@/pages/forgot-my-password/[link]";
import {
  sendVerificationEmail,
  sendPasswordRecoveryEmail,
  sendGetNotifiedConfirmationEmail,
} from "@/server/emailProviders/emailAdapters";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { makeSignedToken } from "./routeUtils/VerificationLinks.routeUtils";
import { validateVerify } from "@/lib/Validations/Verify.validate";
import { validateSignup } from "@/lib/Validations/Signup.validate";
import { verifyToken } from "@/lib/utils/asyncJWT";
import { validateAddToMailingList } from "@/lib/Validations/AddToMailingList.validate";

const isDevEnv = process.env.NODE_ENV === "development";

export const authRouter = createTRPCRouter({
  signup: publicProcedure.input(validateVerify).mutation(async ({ input }) => {
    const hashedPass = await bcrypt.hash(input.password, 10);

    //Create account, user, subscription
    const account = await prisma.account.create({
      data: {
        email: input.email,
        password: hashedPass,
        isVerified: true,
      },
    });
    const user = await prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        image: randomAvatar(),
        account: {
          connect: {
            id: account.id,
          },
        },
      },
    });
    const subscription = await prisma.subscription.create({
      data: {
        active: true,
        isFreeTrial: true,
        cancellAt: addMonths(new Date(), 1),
        userId: user.id,
      },
    });

    //Add to mailing list
    await prisma.mailingList.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
      },
    });

    //Add credits for free plan

    const credits = creditsPerPlan("FREE");
    //ADD CHAT INPUT TOKENS
    const lastInputAction = await prisma.subscriptionCreditsActions.findFirst({
      where: {
        subscriptionId: subscription.id,
        tag: "CHAT_INPUT",
      },
      orderBy: { id: "desc" },
    });
    await addSubscriptionCredits({
      tag: "CHAT_INPUT",
      lastAction: lastInputAction,
      amount: credits.chatInput,
      subscriptionId: subscription.id,
    });

    //ADD CHAT OUTPUT TOKENS
    const lastOutputAction = await prisma.subscriptionCreditsActions.findFirst({
      where: {
        subscriptionId: subscription.id,
        tag: "CHAT_OUTPUT",
      },
      orderBy: { id: "desc" },
    });
    await addSubscriptionCredits({
      tag: "CHAT_OUTPUT",
      lastAction: lastOutputAction,
      amount: credits.chatOutput,
      subscriptionId: subscription.id,
    });

    //ADD TRANSCRIPTION MINUTES
    const lastTranscriptionAction =
      await prisma.subscriptionCreditsActions.findFirst({
        where: {
          subscriptionId: subscription.id,
          tag: "TRANSCRIPTION_MINUTE",
        },
        orderBy: { id: "desc" },
      });
    await addSubscriptionCredits({
      tag: "TRANSCRIPTION_MINUTE",
      lastAction: lastTranscriptionAction,
      amount: credits.transcription,
      subscriptionId: subscription.id,
    });
    //Notify and log
    await createServerLog(`User ${input.email} signed up`, "INFO");
    await postToTelegramGroup(input.email, "SIGNUP");

    //Invalidate link
    await prisma.accountVerificationLinks.updateMany({
      where: { id: input.linkId },
      data: { hasBeenUsed: true },
    });
  }),
  generateVerificationLink: publicProcedure
    .input(validateSignup)
    .mutation(async ({ input }) => {
      //Check if there's a verification link that was created in the last 5 minutes
      // and if so return message that a link was already generated and to check email
      // and if not then generate a new link and return it

      await validateRecaptcha(input.reCaptchaToken);

      const prevLink = await prisma.accountVerificationLinks.findFirst({
        where: {
          email: input.email,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (prevLink && prevLink.createdAt > subMinutes(new Date(), 5)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Too soon to generate a new link. Please check your email.",
        });
      }
      if (prevLink && prevLink.hasBeenUsed) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email already verified. Please login.",
        });
      }

      const secret = process.env.JWT_SECRET;
      const uuid = uuidv4();
      if (!secret) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No secret",
        });
      }
      const signedToken = makeSignedToken({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        uuid,
        secret,
      });
      const baseUrl = process.env.NEXT_PUBLIC_WEB_URL;
      const link = `${baseUrl}/verify/${signedToken}`;

      const verificationLink = await prisma?.accountVerificationLinks.create({
        data: {
          id: uuid,
          verificationLink: link,
          email: input.email,
        },
      });

      if (!isDevEnv || appOptions.enableEmailApiInDevelopment) {
        await sendVerificationEmail({
          email: input.email,
          name: `${input.firstName} ${input.lastName}`,
          link,
        });
      }
      if (isDevEnv && appOptions.enableEmailApiInDevelopment) {
        console.info("Verification Link: ", link);
      }

      return { status: "successs", sentAt: verificationLink.createdAt };
    }),

  createLinkForPasswordRecovery: publicProcedure
    .input(z.object({ email: z.string().email(), reCaptchaToken: z.string() }))
    .mutation(async ({ input }) => {
      await validateRecaptcha(input.reCaptchaToken);

      const account = await prisma.account.findUniqueOrThrow({
        where: { email: input.email, active: true },
        include: { user: true },
      });
      if (!account.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const fetchedUser = account.user;
      //find if there was a password created in the last 5 minutes
      const freshPassLink = await prisma.passwordRecoveryLinks.findFirst({
        where: { createdAt: { gte: subMinutes(new Date(), 5) } },
      });
      if (!!freshPassLink) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User needs to wait more before new email",
        });
      }

      const secret = process.env.JWT_SECRET;
      const uuid = uuidv4();
      if (!secret) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No secret or selectedOrg.",
        });
      }
      const signedToken = makeSignedToken({
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        email: account.email,
        uuid,
        secret,
      });
      const baseUrl = process.env.NEXT_PUBLIC_WEB_URL;

      const link = `${baseUrl}/forgot-my-password/${signedToken}`;

      await prisma.passwordRecoveryLinks.create({
        data: {
          id: uuid,
          recoveryLink: link,
          email: input.email.toLowerCase(),
          accountId: account.id,
        },
      });

      await sendPasswordRecoveryEmail({
        email: input.email.toLowerCase(),
        name: fetchedUser.firstName,
        link,
      });
    }),

  assignPasswordFromRecovery: publicProcedure
    .input(validatePasswordRecovery)
    .mutation(async ({ input }) => {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No secret.",
        });
      }

      const handleToken = await verifyToken(input.token, secret);

      const getLink = await prisma?.passwordRecoveryLinks.findUnique({
        where: { id: input.linkId },
      });
      if (getLink?.hasBeenUsed) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Link already used.",
        });
      }

      const hashedPass = await bcrypt.hash(input.password, 10);

      if (handleToken && "data" in handleToken) {
        // makes sure all links are invalidated
        await prisma?.passwordRecoveryLinks.updateMany({
          where: { email: input.email.toLowerCase() },
          data: { hasBeenUsed: true },
        });

        return prisma?.account.update({
          where: { email: input.email.toLowerCase() },
          data: { password: hashedPass },
        });
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Token invalid.",
        });
      }
    }),
  addToMailingList: publicProcedure
    .input(validateAddToMailingList)
    .mutation(async ({ input }) => {
      await validateRecaptcha(input.reCaptchaToken);
      const mailingListRow = await prisma.mailingList.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
      await sendGetNotifiedConfirmationEmail({
        name: input.firstName,
        email: input.email,
        unsubscribeId: mailingListRow.unsubscribeId,
      });
    }),
});
