import { PricingCardProps } from "@/components/Cards/PricingCard";
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
  content: `An AI assistant that helps generate summaries and show notes for podcasters. 
          AI assistant is a brand new, powerful, human-like artificial intelligence. 
          The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
          AI is a well-behaved and well-mannered individual. 
          AI is not a therapist, but instead a podcast expert. 
          AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
          AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
          AI assistant is a big fan of podcasts.
          AI assistant respects language of the content received from the user.`,
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

export interface pricing {
  title: string;
  monthlyPrice: number;
  features: string[];
}

export const freePricingCard: PricingCardProps = {
  title: "Free",
  defaultPriceId: "",
  prices: [],
  features:
    "1 Podcast, 1 User, 1 Gb of  storage, Rss Feed, 50.000 Chat GPT I/O tokens, 3 hours of audio transcription".split(
      ",",
    ),
  payAsYouGo: [],
  description: "Try for a month, no credit card required.",
  handleCheckout: () => {},
  autenticated: false,
};
