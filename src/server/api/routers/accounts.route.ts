import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { validateAccountEdit } from "@/lib/Validations/Account.validate";

export const accountsRouter = createTRPCRouter({
  count: protectedProcedure.query(async () => {
    return await prisma?.account.count();
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

      return await prisma?.account.findMany({
        take: pageSize,
        skip: pageIndex * pageSize,
        orderBy: { createdAt: "desc" },
      });
    }),

  toggleActivation: adminProcedure
    .input(z.object({ id: z.string(), active: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No user session.",
        });
      }
      return await prisma?.account.update({
        where: {
          id: input.id,
        },
        data: { active: input.active },
      });
    }),
  edit: adminProcedure
    .input(validateAccountEdit)
    .mutation(async ({ input }) => {
      return await prisma?.account.update({
        where: {
          email: input.email,
        },
        data: { email: input.email, role: input.role },
      });
    }),
});
