import { heroContent } from "@/lib/Constants/Hero";
import {
  Text,
  Image,
  Box,
  useColorModeValue,
  Icon,
  chakra,
  Heading,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import HeroScreens from "./HeroScreens";

const HeroPage = () => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box minH={"80vh"} mt={{ base: 0 }} pb={{ base: 20, md: 20 }}>
      <Box
        pos="relative"
        overflow="hidden"
        bg={bg}
        //Adjust padding bottom to fit your hero image
        pb={{ base: 10, md: 0 }}
      >
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{
              base: 8,
              sm: 16,
              md: 20,
              lg: 28,
              xl: 32,
            }}
            maxW={{
              lg: "2xl",
            }}
            w={{
              lg: "full",
            }}
            zIndex={1}
            bg={bg}
            border="solid 1px transparent"
          >
            {/*NOTE: Slanted background */}
            <Icon
              display={{
                base: "none",
                lg: "block",
              }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              h="full"
              w={48}
              color={bg}
              transform="translateX(50%)"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </Icon>
            <Box
              mx="auto"
              maxW={{
                base: "7xl",
              }}
              px={{
                base: 4,
                sm: 6,
                lg: 8,
              }}
              mt={{
                base: 10,
                sm: 12,
                md: 16,
                lg: 20,
                xl: 28,
              }}
            >
              {/* Title */}
              <Box
                w="full"
                textAlign={{
                  base: "center",
                  xl: "left",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Heading
                  fontSize={{
                    base: "5xl",
                    sm: "5xl",
                    md: "6xl",
                    xl: "7xl",
                  }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                  color="gray.900"
                  _dark={{
                    color: "white",
                  }}
                >
                  <chakra.span
                    display={{
                      base: "block",
                    }}
                  >
                    {heroContent.title}{" "}
                  </chakra.span>
                  <chakra.span
                    display={{
                      base: "block",
                      xl: "inline",
                    }}
                    color="brand.500"
                    _dark={{
                      color: "brand.400",
                    }}
                  >
                    {heroContent.highlight}{" "}
                  </chakra.span>
                </Heading>
                <Text
                  mt={{
                    base: 8,
                    sm: 5,
                    md: 5,
                  }}
                  fontSize={{
                    sm: "lg",
                    md: "xl",
                  }}
                  maxW={{
                    sm: "xl",
                  }}
                  mx={{
                    sm: "auto",
                    lg: 0,
                  }}
                  fontWeight="medium"
                >
                  {heroContent.description}
                </Text>
                {/* Manage depending on appOption */}
                <HeroScreens />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          position={{
            lg: "absolute",
          }}
          top={{
            lg: 0,
          }}
          bottom={{
            lg: 0,
          }}
          right={{
            lg: 0,
          }}
          w={{
            lg: "50%",
          }}
          /* border="solid 1px transparent" */
          px={{ base: 4, lg: 0 }}
        >
          {/* Mobile Image */}
          <Image
            /* px={{ base: 4 }} */
            h={[56, 72, 96, "full"]}
            w="full"
            fit="cover"
            src={heroContent.heroImage}
            alt="Hero image"
            loading="lazy"
            hideFrom={"lg"}
            borderRadius={"md"}
          />

          {/* Desktop Image */}
          <Image
            h={"full"}
            w="full"
            fit="contain"
            src={heroContent.heroImage}
            alt="Hero image"
            loading="lazy"
            hideBelow={"lg"}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default HeroPage;
