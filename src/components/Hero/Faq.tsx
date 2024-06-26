import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { socialMediaLinks } from "@/lib/Constants/SocialMedia";
import PageContainer from "../Containers/PageContainer";
import { siteData } from "@/lib/Constants/SiteData";
import { Faq } from "@/lib/Constants/LandingPage";

const Faq = ({ faq }: { faq: Faq[] }) => {
  return (
    <PageContainer id="faq">
      <Flex
        w="full"
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-between" }}
        justifyItems={"center"}
        pb={{ base: "40px", md: "80px" }}
      >
        <Flex
          flexDir={"column"}
          w="full"
          alignContent={"center"}
          alignItems={"center"}
          pt={"10px"}
          gap={"10px"}
        >
          <Heading>Frequently Asked Questions</Heading>
          <Text color={"gray.500"}>
            Have more questions? Reach out through{" "}
            <a
              target="_blank"
              href={socialMediaLinks.twitter}
              style={{ fontWeight: "bold" }}
            >
              twitter
            </a>{" "}
            or{" "}
            <a
              href={`mailto:${siteData.contactEmail}`}
              style={{ fontWeight: "bold" }}
            >
              email
            </a>
          </Text>
        </Flex>
        <Flex w="full" justifyContent={"start"}>
          <Accordion allowToggle w="full">
            {faq.map((q) => (
              <div key={q.question}>
                <AccordionItem pt={"10px"} key={q.question}>
                  <AccordionButton>
                    <Flex justifyContent={"space-between"} w="full">
                      <Heading
                        fontWeight={"medium"}
                        fontSize={"xl"}
                        as="span"
                        flex="1"
                        textAlign="left"
                      >
                        {q.question}
                      </Heading>
                    </Flex>
                    <AccordionIcon fontSize={"3xl"} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text>{q.answer}</Text>
                  </AccordionPanel>
                </AccordionItem>
                <Divider pt="10px" />
              </div>
            ))}
          </Accordion>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default Faq;
