import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { validateProfileEdit } from "@/lib/Validations/ProfileEdit.validate";
import { validateUserEdit } from "@/lib/Validations/User.validate";
import { validateUserCreate } from "@/lib/Validations/CreateUser.validate";
import { randomAvatar } from "@/lib/Constants/RandomAvatars";
import { createNewUserResources } from "./routeUtils/authRoute.utils";
import { appOptions } from "@/lib/Constants/AppOptions";
import {
  makeSidnedTokenForUserCreate,
  makeSignedToken,
} from "./routeUtils/VerificationLinks.routeUtils";
import { env } from "@/env.mjs";
import { sendUserCreateEmail } from "@/server/emailProviders/emailAdapters";
import { validateVerify } from "@/lib/Validations/Verify.validate";
const { v4: uuidv4 } = require("uuid");
import bcrypt from "bcryptjs";

const isDevEnv = process.env.NODE_ENV === "development";

export const usersRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.user.findUniqueOrThrow({
        where: { id: input.id },
      });
    }),

  getMyPreferences: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.preferences.findUnique({
      where: {
        userId: userId,
      },
    });
  }),
  hasSeenOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    await prisma.preferences.update({
      where: { userId: userId },
      data: {
        hasSeenOnboarding: true,
      },
    });
  }),

  getMySubscription: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.subscription.findUnique({
      where: {
        userId: userId,
      },

      include: {
        product: true,
        user: {
          select: {
            preferences: { select: { hasSeenOnboarding: true } },
          },
        },
      },
    });
  }),

  updateProfile: protectedProcedure
    .input(validateProfileEdit)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: input.name,
          image: input.avatarUrl,
        },
      });
    }),
  count: protectedProcedure.query(async () => {
    return await prisma?.user.count();
  }),
  getMany: adminProcedure
    .input(
      z.object({
        pageIndex: z.number().nullish(),
        pageSize: z.number().min(1).max(100).nullish(),
        sorting: z
          .object({ id: z.string(), desc: z.boolean() })
          .array()
          .nullish(),
      }),
    )
    .query(async ({ input }) => {
      const pageSize = input.pageSize ?? 10;
      const pageIndex = input.pageIndex ?? 0;

      return await prisma?.user.findMany({
        take: pageSize,
        skip: pageIndex * pageSize,
        orderBy: { createdAt: "desc" },
      });
    }),
  edit: adminProcedure.input(validateUserEdit).mutation(async ({ input }) => {
    if (!input.email) throw new Error("Email is required");
    return await prisma?.user.update({
      where: {
        email: input.email,
      },
      data: { role: input.role },
    });
  }),

  createAndInvite: adminProcedure
    .input(validateUserCreate)
    .mutation(async ({ input }) => {
      await prisma.$transaction(async (tx) => {
        //Create account, user, subscription
        const user = await tx.user.create({
          data: {
            email: input.email,
            name: input.name,
            image: randomAvatar(),
            role: input.role,
          },
        });

        await tx.account.create({
          data: {
            userId: user.id,
            providerAccountId: input.email,
            /* password: hashedPass, */
            provider: "credentials",
            type: "credentials",
          },
        });
        await createNewUserResources({
          tx,
          userId: user.id,
          email: input.email,
          name: input.name,
        });
        const secret = env.JWT_SECRET;
        const uuid = uuidv4();

        const signedToken = makeSidnedTokenForUserCreate({
          email: input.email,
          name: input.name,
          uuid,
          secret,
        });
        const baseUrl = env.NEXT_PUBLIC_WEB_URL;
        const link = `${baseUrl}/invite/${signedToken}`;

        //Create a record in the verificationLinks table to prevent multiple invites
        await prisma?.accountVerificationLinks.create({
          data: {
            id: uuid,
            verificationLink: link,
            email: input.email,
          },
        });

        if (!isDevEnv || appOptions.enableEmailApiInDevelopment) {
          await sendUserCreateEmail({
            email: input.email,
            name: input.name,
            link,
          });
        }
      });
    }),
  assignPasswordToInvitedUser: publicProcedure
    .input(validateVerify)
    .mutation(async ({ input }) => {
      const hashedPass = await bcrypt.hash(input.password, 10);

      await prisma.$transaction(async (tx) => {
        //Create account, user, subscription
        const user = await tx.user.update({
          where: { email: input.email },
          data: {
            emailVerified: new Date(),
          },
        });

        await tx.account.updateMany({
          where: { userId: user.id },
          data: {
            password: hashedPass,
          },
        });

        //Invalidate link
        await tx.accountVerificationLinks.updateMany({
          where: { id: input.linkId },
          data: { hasBeenUsed: true },
        });
      });
    }),

  nukeUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const isDevEnv = process.env.NODE_ENV === "development";
      if (!isDevEnv) throw new Error("Not in development environment");
      await prisma.$transaction(async (tx) => {
        const sub = await tx.subscription.findFirst({
          where: { userId: input.userId },
        });
        if (!sub) throw new Error("No subscription found");

        await tx.scribe.deleteMany({
          where: { subscriptionId: sub.id },
        });
        await tx.supportTicket.deleteMany({
          where: { userId: input.userId },
        });
        await tx.subscription.delete({
          where: { userId: input.userId },
        });
        await tx.subscriptionCreditsActions.deleteMany({
          where: { subscriptionId: sub.id },
        });
        await tx.subscriptionItem.deleteMany({
          where: { subscriptionId: sub.id },
        });

        const user = await tx.user.delete({
          where: { id: input.userId },
        });

        if (user.email) {
          await tx.mailingList.delete({
            where: { email: user.email ?? "" },
          });
        }
      });
    }),
});
