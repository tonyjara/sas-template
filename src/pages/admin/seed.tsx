import { trpcClient } from "@/utils/api";
import { Button, Container } from "@chakra-ui/react";
import React from "react";

const SeedPage = () => {
  const { mutate } = trpcClient.admin.verifySMTPconnection.useMutation();
  return (
    <Container pt={"20px"}>
      <Button onClick={() => mutate()}>Verify SMTP</Button>
    </Container>
  );
};

export default SeedPage;
