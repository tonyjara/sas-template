import { User } from "@prisma/client";
import * as z from "zod";

export interface VerifyLinkPageData {
  accountId: string;
  email: string;
  linkId: string;
  name: string;
}

export interface PasswordRecoveryForm extends VerifyLinkPageData {
  password: string;
  confirmPassword: string;
  token: string;
}

export type UserEditValues = Pick<User, "email" | "role">;

export const validatePasswordRecovery: z.ZodType<PasswordRecoveryForm> = z.lazy(
  () =>
    z
      .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z
          .string()
          .min(8, "Password must be at least 8 characters"),
        token: z.string().min(1),
        accountId: z.string().min(1),
        linkId: z.string().min(1),
        email: z.string().min(1),
        name: z.string().min(1),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }),
);
