import { PricingCardProps } from "@/components/Cards/Pricing.card";

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
