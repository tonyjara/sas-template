import Faq from "@/components/Hero/Faq";
import Features from "@/components/Hero/Features";
import Footer from "@/components/Hero/Footer";
import HeroPage from "@/components/Hero/Hero";
import Testimonials from "@/components/Hero/Testimonials";
import { transcribelyFaq } from "@/lib/Constants/SiteData";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps } from "next";
import React from "react";
import Stripe from "stripe";

export interface PricingPageProps {
  products: Stripe.ApiList<Stripe.Product>;
  prices: Stripe.ApiList<Stripe.Price>;
}

const Index = () => {
  return (
    <>
      <HeroPage />
      <Features />
      <Testimonials />
      <Faq faq={transcribelyFaq} />
      <Footer />
    </>
  );
};

export default Index;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { p = "/" } = ctx.query;

  const session = await getServerAuthSession(ctx);

  const destination = () => {
    if (p.toString().length === 1) return "/home";
    return p.toString();
  };

  if (session) {
    return {
      redirect: {
        destination: destination(),
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
