import * as z from "zod";

export interface AddToMailingListFormValues {
  email: string;
  firstName: string;
  lastName: string;
  reCaptchaToken: string;
}

export const validateAddToMailingList: z.ZodType<AddToMailingListFormValues> =
  z.lazy(() =>
    z.object({
      email: z.string().email({ message: "Please enter a valid email" }),
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      reCaptchaToken: z.string(),
    }),
  );

export const defaultAddToMailingListValues: AddToMailingListFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  reCaptchaToken: "",
};
