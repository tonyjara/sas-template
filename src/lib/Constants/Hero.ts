export const heroContent = {
  title: "Transcribe",
  highlight: "everything.",
  description:
    "Extract text from audio or video files, store and search through your transcriptions. Use AI to process or complement them and export to several formats.",
  heroImage: "/assets/hero/pink-mic.jpeg",
};

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
