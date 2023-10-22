import { Box } from "@chakra-ui/react";
import React from "react";

// Standardize page padding
const PageContainer = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <Box px={{ base: 3, md: 5 }} py={{ base: 3, md: 3 }}>
      {children}
    </Box>
  );
};

export default PageContainer;
