import { Heading, Text, VStack, Container, Flex } from "@chakra-ui/react";
import { trpcClient } from "@/utils/api";
import PricingCard from "@/components/Cards/Pricing.card";
import { useSession } from "next-auth/react";
import { handleMutationAlerts } from "@/components/Alerts/MyToast";
import { type PricingPageProps } from "@/pages";
import { useRouter } from "next/router";
import { appOptions } from "@/lib/Constants/AppOptions";
import { pricingPageContent, freePricingCard } from "@/lib/Constants/Pricing";

export default function Pricing({ prices, products }: PricingPageProps) {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();

  const authenticated = session?.status === "authenticated";

  const { mutate } =
    trpcClient.stripe.getSessionUrlAndCreatePaymentIntent.useMutation(
      handleMutationAlerts({
        successText: "Redirecting to checkout...",
        callback: ({ url }) => {
          if (!url) return;
          window.location.assign(url);
        },
      }),
    );

  const { data: mySubscription } = trpcClient.users.getMySubscription.useQuery(
    undefined,
    {
      enabled: !!user?.id,
    },
  );
  const handleCheckout = async (productId?: any, defaultPriceId?: any) => {
    if (!authenticated) return router.push("/signup");
    if (!productId || !defaultPriceId) return;
    mutate({ productId, defaultPriceId });
  };

  return (
    <Container id="pricing" py={12} maxW={"5xl"}>
      <VStack spacing={2} textAlign="center">
        <Heading maxW="800px" as="h1" fontSize="4xl">
          {pricingPageContent.title}
        </Heading>
        <Text maxW="800px" fontSize="lg" color={"gray.500"}>
          {pricingPageContent.description}
        </Text>
      </VStack>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={8}
        justifyContent="center"
        /* spacing={{ base: 4, lg: 10 }} */
        py={10}
      >
        {/* NOTE: This is the free price card. This one is not related to STRIPE. */}
        {appOptions.freeTrialIsEnabled && (
          <PricingCard
            handleCheckout={() => router.push("/signup")}
            description={freePricingCard.description}
            autenticated={false}
            defaultPriceId={""}
            prices={[]}
            title={freePricingCard.title}
            features={freePricingCard.features}
            currentPlan={authenticated && mySubscription?.isFreeTrial}
          />
        )}
        {products.data
          .sort(
            (a: any, b: any) =>
              (a.metadata?.sortOrder ?? "0") - (b.metadata?.sortOrder ?? "0"),
          )
          .map((product, i) => {
            const productPrices = prices.data.filter(
              (x) => x.product === product.id,
            );
            const features = product.metadata?.features;
            const payAsYouGo = product.metadata?.payAsYouGo;
            return (
              <PricingCard
                popular={i === 1}
                key={product.id}
                payAsYouGo={payAsYouGo ? payAsYouGo.split(",") : []}
                handleCheckout={() => {
                  if (!product.default_price || !product.id) return;
                  return handleCheckout(product.id, product.default_price);
                }}
                description={product.description ?? ""}
                autenticated={authenticated}
                defaultPriceId={product.default_price?.toString() ?? ""}
                prices={productPrices}
                title={product.name}
                features={features ? features.split(",") : []}
              />
            );
          })}
      </Flex>
    </Container>
  );
}
