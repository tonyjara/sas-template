/**INFO: In this file we discern what provider was chosen in flags and use the appropriate functions */

//NOTE: In order for nodemailer to work in prod it must be called as a promise

import { appOptions } from "@/lib/Constants/AppOptions";
import { siteData } from "@/lib/Constants/SiteData";
import {
  newsletterConfirmationTemplate,
  passwordRecoveryEmailTemplate,
  verificationEmailTemmplate,
} from "./emailTemplates";
import { sendEmail } from "./mailersend";
import { transporter } from "./nodemailer";

export async function sendVerificationEmail({
  email,
  name,
  link,
}: {
  email: string;
  name: string;
  link: string;
}) {
  if (appOptions.emailProvider === "MAILERSEND") {
    return await sendEmail({
      from: `signup@${siteData.mailDomain}`,
      fromName: `${siteData.appName}`,
      to: email,
      toName: name,
      subject: `${siteData.appName} - Verify your email address`,
      html: verificationEmailTemmplate({ link, name }),
      text: "Verify your email address",
    });
  }

  //Default to NODEMIALER
  const mailData = {
    from: `signup@${siteData.mailDomain}`,
    to: email,
    subject: `${siteData.appName} - Verify your email address`,
    html: verificationEmailTemmplate({ link, name }),
  };

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}

export async function sendPasswordRecoveryEmail({
  email,
  name,
  link,
}: {
  email: string;
  name: string;
  link: string;
}) {
  if (appOptions.emailProvider === "MAILERSEND") {
    return await sendEmail({
      from: `password-reset@${siteData.mailDomain}`,
      fromName: `${siteData.appName}`,
      to: email,
      toName: name,
      subject: `${siteData.appName} - Password reset`,
      html: passwordRecoveryEmailTemplate({ link, name }),
      text: "Reset your password",
    });
  }

  //Default to NODEMIALER
  const mailData = {
    from: `password-reset@${siteData.mailDomain}`,
    to: email,
    subject: `${siteData.appName} - Password reset`,
    html: passwordRecoveryEmailTemplate({ link, name }),
  };

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}

export async function sendNewsLetterConfirmationEmail({
  email,
  name,
  link,
}: {
  email: string;
  name: string;
  link: string;
}) {
  if (appOptions.emailProvider === "MAILERSEND") {
    return await sendEmail({
      from: `donotreply@${siteData.mailDomain}`,
      fromName: `${siteData.appName}`,
      to: email,
      toName: name,
      subject: `Confirmation for ${siteData.appName} newsletter`,
      html: newsletterConfirmationTemplate({ link, name }),
      text: "Reset your password",
    });
  }

  const mailData = {
    from: `donotreply@${siteData.mailDomain}`,
    to: email,
    subject: `Confirmation for ${siteData.appName} newsletter`,
    html: newsletterConfirmationTemplate({ link, name }),
  };

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
