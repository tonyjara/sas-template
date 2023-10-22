import EditStripePriceForm from "@/components/Forms/EditStripePrice.form";
import { trpcClient } from "@/utils/api";
import { Text, Flex } from "@chakra-ui/react";
import React from "react";

const StripePrices = () => {
  const { data } = trpcClient.stripe.getProductsAndPrices.useQuery();

  return (
    <Flex flexDir={"column"}>
      <Flex p={4}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {" "}
          List of all stripe prices. Total: {data?.prices.data.length} Prices
        </Text>
      </Flex>
      <Flex w="full" justifyContent={"center"}>
        <Flex flexDir={"column"} maxW={"400px"} w="full">
          {data?.prices.data.map((price) => {
            return (
              <EditStripePriceForm
                key={price.id}
                price={price}
                isDefault={data?.products.data.some(
                  (product) => product.default_price === price.id,
                )}
              />
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StripePrices;
