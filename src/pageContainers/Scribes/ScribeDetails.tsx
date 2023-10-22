import CollapsableContainer from "@/components/CollapsableContainer";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import FormControlledEditableText from "@/components/Forms/FormControlled/FormControlledEditable";
import { Flex } from "@chakra-ui/react";
import { ScribePageType } from "./Scribes.types";
import FormControlledText from "@/components/Forms/FormControlled/FormControlledText";

const EpisodeEditDetails = ({
  collapseAll,
  setCollapseAll,
  control,
  errors,
}: {
  collapseAll: boolean;
  setCollapseAll: React.Dispatch<React.SetStateAction<boolean>>;
  control: Control<ScribePageType>;
  errors: FieldErrors<ScribePageType>;
}) => {
  return (
    <CollapsableContainer
      collapseAll={collapseAll}
      setCollapseAll={setCollapseAll}
      title="Episode Details"
    >
      <Flex flexDir={"column"} gap={"20px"} pt={"10px"}>
        <FormControlledEditableText
          control={control}
          errors={errors}
          name="name"
        />
        <FormControlledText
          control={control}
          errors={errors}
          name="description"
          label="Description"
          isTextArea
          helperText="Make this something that will help you remember what this scribe is about."
        />
      </Flex>
    </CollapsableContainer>
  );
};

export default EpisodeEditDetails;
