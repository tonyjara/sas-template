import jwt from "jsonwebtoken";

export const makeSignedToken = ({
  email,
  name,
  secret,
  uuid,
}: {
  email: string;
  name: string;
  secret: string;
  uuid: string;
}) =>
  jwt.sign(
    {
      data: {
        email,
        linkId: uuid,
        name,
      },
    },
    secret,
    { expiresIn: 60 * 60 },
  );

export const makeSignedTokenForPasswordRecovery = ({
  email,
  name,
  secret,
  accountId,
  uuid,
}: {
  email: string;
  name: string;
  secret: string;
  accountId: string;
  uuid: string;
}) =>
  jwt.sign(
    {
      data: {
        email,
        linkId: uuid,
        name,
        accountId,
      },
    },
    secret,
    { expiresIn: 60 * 60 },
  );
export interface SignedTokenForNewsletterConfirmType {
  email: string;
  name: string;
  secret: string;
  confirmationId: string;
}

export const makeSignedTokenForNewsletterConfirm = ({
  email,
  name,
  secret,
  confirmationId,
}: SignedTokenForNewsletterConfirmType) =>
  jwt.sign(
    {
      data: {
        email,
        confirmationId,
        name,
      },
    },
    secret,
    { expiresIn: 60 * 60 },
  );
