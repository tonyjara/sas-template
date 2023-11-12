import { IconType } from "react-icons";
import { CgExport } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { PiFileAudioFill } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";
import { RiOpenaiFill } from "react-icons/ri";

//Used in footer and meta tags
export const siteData = {
  appName: "Transcribely",
  blackLogo: "/assets/logo/black-logo.png",
  whiteLogo: "/assets/logo/white-logo.png",
  mailDomain: "mail.transcribely.io", // For things as email verification ex: confirmation@mailDomain
  contactEmail: "info@transcribely.io", // For things as email verification ex: confirmation@mailDomain

  //Metadata
  author: "Tony Jara",
  prodUrl: "https://transcribely.io",
  ogCoverImage: "/assets/meta/og-cover.jpeg",
  description:
    "Transcribe any type of audio or video file. Pre-recorded or live. We support all major audio and video formats. Store and search through your transcriptions.",
};

export interface Faq {
  question: string;
  answer: string;
}

export const transcribelyFaq: Faq[] = [
  {
    question: "How much does it cost?",
    answer:
      "There is a generous free tier. Check out our pricing page. After that you only pay for what you use.",
  },
  {
    question: "Do you offer support?",
    answer: `Yes, we offer support for all our products. You can contact us at bia the contact form on our contact page or by sending an email to ${siteData.contactEmail}`,
  },
  {
    question: "What is your refund policy?",
    answer:
      "Refunds are not available for this product. If you have any questions about the product, please contact us before making a purchase.",
  },
];
export interface Features {
  title: string;
  description: string;
  icon: IconType;
  href?: string;
}

export const featurePageContent = {
  title: "Simple and powerful",
  description:
    "No complex workflows. No complicated pricing. Just simple and powerful tools to help you transcribe your audio and video files.",
};

export const appFeatures: Features[] = [
  {
    title: "Languages",
    description:
      "We support over 10 languages with auto detection. We are constantly adding more languages.",
    icon: MdLanguage,
  },
  {
    title: "Video or Audio",
    description:
      "Transcribe from video or audio files. We support all major video and audio formats.",
    icon: PiFileAudioFill,
  },
  {
    title: "Search and Filter",
    description:
      "Filter and search through your transcriptions. We make it easy to find what you are looking for.",
    icon: BsSearch,
  },
  {
    title: "Export and share",
    description:
      "Export to popular formats like PDF, TXT, HTML, and more. Share your transcriptions with anyone.",
    icon: CgExport,
  },
  {
    title: "A.I. Powered",
    description:
      "Interact with your transcriptions using our A.I. powered tools. We are constantly improving our A.I. tools.",
    icon: RiOpenaiFill,
  },
];
