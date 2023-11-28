import { Role } from "@prisma/client";
import * as z from "zod";

export type FormCreateUser = {
  email: string;
  name: string;
  role: Role;
};

export const validateUserCreate: z.ZodType<FormCreateUser> = z.lazy(() =>
  z.object({
    name: z
      .string({ required_error: "Please enter the user's name" })
      .max(64)
      .min(3),
    email: z.string().email().max(128),

    role: z.nativeEnum(Role),
  }),
);

export const defaultUserCreateValues: FormCreateUser = {
  email: "",
  name: "",
  role: "user",
};
