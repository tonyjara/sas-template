import { PricingCardProps } from "@/components/Cards/Pricing.card";
import { CloudProviders } from "@prisma/client";
import { ChatCompletionMessage } from "openai/resources/chat";

//Social media
export const socialMediaLinks = {
  twitter: "https://twitter.com/nytoraja",
  instagram: "",
  youtube: "https://www.youtube.com/@Nytojara",
};

export const heroContent = {
  title: "Transcribe",
  highlight: "everything.",
  description:
    "Transcribe any type of audio or video file. Pre-recorded or live. We support all major audio and video formats. Store and search through your transcriptions.",
  heroImage: "/assets/hero/pink-mic.jpeg",
};

//Used in footer and meta tags
export const siteData = {
  appName: "Transcribely",
  blackLogo: "/assets/logo/black-logo.png",
  whiteLogo: "/assets/logo/white-logo.png",
  mailDomain: "transcribely.io", // For things as email verification ex: confirmation@mailDomain
  contactEmail: "nytojara@gmail.com", // For things as email verification ex: confirmation@mailDomain

  //Metadata
  author: "Tony Jara",
  prodUrl: "https://transcribely.io",
  ogCoverImage: "/assets/meta/og-cover.jpeg",
  description:
    "Transcribe any type of audio or video file. Pre-recorded or live. We support all major audio and video formats. Store and search through your transcriptions.",
};

export const systemMessage: ChatCompletionMessage = {
  role: "system",
  content: `An AI assistant that helps generate content based on audio transcriptions. 
          AI assistant is a brand new, powerful, human-like artificial intelligence. 
          The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
          AI is a well-behaved and well-mannered individual. 
          AI is not a therapist, but instead an expert content synthesizer. 
          AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
          AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
          AI assistant is a big fan of audio transcriptions.
          AI assistant always responds in the same language as the prompts.`,
};

//Avatar placeholders
export const avatars = [
  "https://res.cloudinary.com/tonyjara/image/upload/v1691623638/podcast-solutions/avatars/hqa76voqxhz7iolzzeo9.jpg",
  "https://res.cloudinary.com/tonyjara/image/upload/v1691623637/podcast-solutions/avatars/birkhahcepzom9i4u8n1.jpg",
  "https://res.cloudinary.com/tonyjara/image/upload/v1691623637/podcast-solutions/avatars/uibbhsvlb8lrjjafeuwl.jpg",
  "https://res.cloudinary.com/tonyjara/image/upload/v1691623637/podcast-solutions/avatars/l9wa3gpbw93rbhnyekmy.jpg",
  "https://res.cloudinary.com/tonyjara/image/upload/v1691623637/podcast-solutions/avatars/q9rjtdocxlbbnfbe0ahc.jpg",
  "https://res.cloudinary.com/tonyjara/image/upload/v1691623637/podcast-solutions/avatars/lxrk5zc2lgbqccq3ahpc.jpg",
];
export const randomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex] as string;
};

export const freePricingCard: PricingCardProps = {
  title: "Free",
  defaultPriceId: "",
  prices: [],
  features:
    "1 User, 1 Gb of  storage, 50.000 Chat GPT I/O tokens, 3 hours of audio transcription".split(
      ",",
    ),
  payAsYouGo: [],
  description:
    "Try for a month, no credit card required. Keep the credits whenever you decide to upgrade.",
  handleCheckout: () => {},
  autenticated: false,
};

export const pricingPageContent = {
  title: "Choose the plan that better fits your needs",
  description:
    "Cancel any time, no questions asked. All values are cumulative, if you don't use them they remain in your account for as long as your subscription is active, in case of suspending your subscription your values will be held as is for 3 months.",
};

export interface appOptions {
  heroScreenType: //
  | "getStartedFree"
    //Will allow signup and login with a free plan (regular behavior)
    | "comingSoon"
    //Will show a coming soon banner,
    //Signup and login will be enabled in development
    //Only login enabled in production
    | "maintenance"
    //Will show a maintenance banner
    //Signup and login will be enabled in development
    //Only admins can login in production
    | "notifyMeWhenReady";
  //Will allow signin up for a mailing list to be notified when launching
  //Signup and login will be enabled in development
  //Login enabled in production
  emailProvider: "NODEMAILER" | "MAILERSEND";
  enableEmailApiInDevelopment: boolean;
  freeTrialIsEnabled: boolean;
  enableTelegramNotifications: boolean;
  cloudStorageProvider: CloudProviders;
}

//This changes the way the app behaves, keep in mind that if you change this values
//You will need to redeploy the app to see the changes
export const appOptions: appOptions = {
  heroScreenType: "notifyMeWhenReady",
  //Pick what kind of hero screen to show
  emailProvider: "NODEMAILER",
  //Logic to pick the right email provider are in the emailAdapters file
  //Individual logic is found in mailserend.ts and nodemailer.ts
  //Nodemailer uses SMTP, I recommend pairing with AWS SES
  enableEmailApiInDevelopment: true,
  //If disabled the email content will be displayed through the console and not sent
  //Useful after you've tested the email flow and you want to avoid spending email credits
  freeTrialIsEnabled: true,
  //This toggles the free trial CARD in the pricing section
  enableTelegramNotifications: true,
  //Some actions like signing up send notifications to telegram
  cloudStorageProvider: CloudProviders.azure,
  //This is used to determine the cloud provider to use for media storage, like audioFiles and images
};
