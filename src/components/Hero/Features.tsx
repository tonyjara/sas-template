import { appFeatures, featurePageContent } from "@/lib/Constants/SiteData";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactElement } from "react";
import PageContainer from "../Containers/PageContainer";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href?: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      boxShadow={"lg"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      _after={{
        content: '""',
        position: "absolute",
        height: "21px",
        width: "29px",
        left: "35px",
        top: "-10px",
        backgroundSize: "cover",
      }}
      _before={{
        content: '""',
        position: "absolute",
        zIndex: "-1",
        height: "full",
        maxW: "640px",
        width: "full",
        filter: "blur(40px)",
        transform: "scale(0.98)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        top: 0,
        left: 0,
      }}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.400", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text
            fontFamily={"Inter"}
            fontWeight={"medium"}
            mt={1}
            fontSize={"sm"}
          >
            {description}
          </Text>
        </Box>
        {href && (
          <Button
            href={href}
            as={Link}
            variant={"link"}
            colorScheme={"blue"}
            size={"sm"}
          >
            Learn more
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default function Features() {
  return (
    <PageContainer id="features">
      <Box py={20}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <chakra.h1
            py={1}
            fontSize={48}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            color={useColorModeValue("gray.700", "gray.50")}
          >
            {featurePageContent.title}
          </chakra.h1>
          <chakra.h2
            margin={"auto"}
            width={"70%"}
            fontFamily={"Inter"}
            fontWeight={"medium"}
            fontSize={"lg"}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            {featurePageContent.description}
          </chakra.h2>
        </Stack>

        <Container maxW={"5xl"} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            {appFeatures.map((feature) => (
              <Card
                key={feature.title}
                heading={feature.title}
                icon={<Icon as={feature.icon} w={10} h={10} />}
                description={feature.description}
                href={feature.href}
              />
            ))}
          </Flex>
        </Container>
      </Box>
    </PageContainer>
  );
}
