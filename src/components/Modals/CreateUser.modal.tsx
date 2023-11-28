import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useClipboard,
  Container,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Account, Role } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { knownErrors } from "../../lib/dictionaries/knownErrors";
import { trpcClient } from "@/utils/api";
import {
  FormCreateUser,
  defaultUserCreateValues,
  validateUserCreate,
} from "@/lib/Validations/CreateUser.validate";
import FormControlledSelect from "../Forms/FormControlled/FormControlledSelect";
import FormControlledText from "../Forms/FormControlled/FormControlledText";
import { handleMutationAlerts } from "../Alerts/MyToast";

const CreateUserModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: any;
}) => {
  const trpcContext = trpcClient.useUtils();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormCreateUser>({
    defaultValues: defaultUserCreateValues,
    resolver: zodResolver(validateUserCreate),
  });
  const handleOnClose = () => {
    setValue("");
    reset(defaultUserCreateValues);
    onClose();
  };
  const { mutate, isLoading } = trpcClient.users.createAndInvite.useMutation(
    handleMutationAlerts({
      successText: "User created and invitation sent",
      callback: () => {
        trpcContext.invalidate();
        handleOnClose();
      },
    }),
  );

  const submitFunc = async (data: FormCreateUser) => {
    mutate(data);
  };

  const roleOptions: { value: Role; label: string }[] = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "support", label: "Support" },
  ];

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <form onSubmit={handleSubmit(onSubmit ?? submitFunc)} noValidate>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {value.length > 0 && (
              <Container textAlign={"center"}>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  Share this link with the user
                </Text>
                <Button onClick={onCopy} mb={10} mt={1}>
                  {hasCopied ? "Copied!" : "Copy invite"}
                </Button>
              </Container>
            )}
            {!value.length && (
              <>
                <FormControlledText
                  control={control}
                  errors={errors}
                  name="name"
                  label="User name"
                  autoFocus={true}
                />
                <FormControlledText
                  control={control}
                  errors={errors}
                  name="email"
                  label="Email"
                  helperText="Please enter a valid email address"
                />
                <FormControlledSelect
                  control={control}
                  errors={errors}
                  name="role"
                  label="Select a role"
                  options={roleOptions ?? []}
                />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={isLoading || isSubmitting || !!value}
              type="submit"
              mr={3}
            >
              Save
            </Button>
            <Button colorScheme="gray" mr={3} onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
