import { Account, Role } from "@prisma/client";
import * as z from "zod";

export type AccountEditValues = Pick<Account, "email" | "role">;

export const validateAccountEdit: z.ZodType<AccountEditValues> = z.lazy(() =>
  z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    role: z.nativeEnum(Role),
  }),
);

export const defaultEditAccountValues: AccountEditValues = {
  email: "",
  role: "user",
};
