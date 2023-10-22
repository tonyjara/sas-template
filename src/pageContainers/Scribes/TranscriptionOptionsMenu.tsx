import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { handleUseMutationAlerts } from "@/components/Alerts/MyToast";
import { trpcClient } from "@/utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsThreeDots } from "react-icons/bs";
import { ScribePageType } from "./Scribes.types";
import AreYouSureButton from "@/components/Buttons/AreYouSure.button";
import { UseFormSetValue } from "react-hook-form";

const TranscriptionOptionsMenu = ({
  scribe,
  setValue,
}: {
  scribe: ScribePageType | null | undefined;
  setValue: UseFormSetValue<ScribePageType>;
}) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const { mutate: summarizeUserContent } =
    trpcClient.chatGPT.summarizeUserContent.useMutation(
      handleUseMutationAlerts({
        successText: "Summary generated",
        callback: ({ summary }) => {
          setValue("userContent", summary);
        },
      }),
    );

  const { mutate: prettify } =
    trpcClient.chatGPT.prettifyUserContent.useMutation(
      handleUseMutationAlerts({
        successText: "It's pretty now",
        callback: ({ prettyContent }) => {
          setValue("userContent", prettyContent);
        },
      }),
    );

  const restore = () => {
    if (!scribe) return;
    setValue("userContent", scribe.transcription);
  };
  return (
    <>
      <Menu>
        {isLargerThan800 && (
          <MenuButton as={Button} size={"sm"} rightIcon={<ChevronDownIcon />}>
            Options
          </MenuButton>
        )}
        {!isLargerThan800 && (
          <MenuButton
            as={IconButton}
            size={"sm"}
            aria-label="Scribe options"
            icon={<BsThreeDots fontSize={"sm"} />}
          />
        )}
        <MenuList>
          <MenuGroup>
            <MenuItem>
              <AreYouSureButton
                customButton={<>Summarize</>}
                confirmAction={() =>
                  scribe && summarizeUserContent({ scribeId: scribe.id })
                }
                modalContent="This is going to overwrite your current scribe, but it's not going to save it, so you can discard the new changes if you want."
              />
            </MenuItem>
            <MenuItem>
              <AreYouSureButton
                customButton={<>Make it prettier</>}
                confirmAction={() =>
                  scribe && prettify({ scribeId: scribe.id })
                }
                modalContent="This is going to overwrite your current scribe, but it's not going to save it, so you can discard the new changes if you want."
              />
            </MenuItem>
            <MenuItem>
              <AreYouSureButton
                customButton={<>Restore original transcription</>}
                confirmAction={() => restore()}
                modalContent="This is going to overwrite your current scribe, but it's not going to save it, so you can discard the new changes if you want."
              />
            </MenuItem>
            <MenuItem>Edit default Prompts</MenuItem>
            <MenuItem>Download as pdf</MenuItem>
            <MenuItem>Download as HTML</MenuItem>
            <MenuItem>Download as plain text</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
};

export default TranscriptionOptionsMenu;
