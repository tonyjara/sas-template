import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const usersRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see jhis secret message!";
  }),
  sendPublicEmail: publicProcedure
    .input(
      z.object({
        hasSeenOnboarding: z.boolean(),
        selectedPodcastId: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      /* const userId = ctx.session.user.id; */
      /* return await prisma.preferences.upsert({ */
      /*   where: { userId: userId }, */
      /*   create: { */
      /*     hasSeenOnboarding: input.hasSeenOnboarding, */
      /*     userId: userId, */
      /*   }, */
      /*   update: { */
      /*     hasSeenOnboarding: input.hasSeenOnboarding, */
      /*   }, */
      /* }); */
    }),
});
