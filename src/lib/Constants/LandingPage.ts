import { IconType } from "react-icons";
import { CgExport } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { PiFileAudioFill } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";
import { RiOpenaiFill } from "react-icons/ri";
import { siteData } from "./SiteData";

export const heroContent = {
  title: "Transcribe",
  highlight: "everything.",
  description:
    "Extract text from audio or video files, store and search through your transcriptions. Use AI to process or complement them and export to several formats.",
  heroImage: "/assets/hero/pink-mic.jpeg",
};

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

export const testimonialsContent = {
  caption: "People are talking about us",
  title: "You're in good company",
  //Use the | character to break the line
  description:
    "With over | transcribed hours, we're trusted by teams all over the world to help them transcribe their audio and video files.",
  count: "100,000+",
};

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Andrews",
    role: "Marketing Manager",
    content:
      "Transcribely transformed my work life. As a Marketing Manager, it's streamlined our meetings, turning ideas into action effortlessly. A productivity booster for sure!",
    avatar: "/assets/testimonials/sarah.jpg",
  },
  {
    name: "Alex Green",
    role: "Student",
    content:
      "Transcribely is a study game-changer. I record lectures, transcribe them, and use the manipulation features for efficient review. It's my go-to for academic success.",
    avatar: "/assets/testimonials/alex.jpg",
  },
  {
    name: "David Smith",
    role: "Project Manager",
    content:
      "Managing projects got easier with Transcribely. I review and share meeting transcripts, keeping everyone aligned. A must for seamless project coordination.",
    avatar: "/assets/testimonials/david.jpg",
  },
  {
    name: "Emily Adams",
    role: "Entrepreneur",
    content:
      "Transcribely is my entrepreneurial sidekick. It's a time-saver for refining ideas from recorded meetings. Stay organized and focused on what matters most.",
    avatar: "/assets/testimonials/emily.jpg",
  },
];

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
