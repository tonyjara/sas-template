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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Role } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { trpcClient } from "@/utils/api";
import {
  FormCreateUser,
  defaultUserCreateValues,
  validateUserCreate,
} from "@/lib/Validations/CreateUser.validate";
import FormControlledSelect from "../Forms/FormControlled/FormControlledSelect";
import FormControlledText from "../Forms/FormControlled/FormControlledText";
import { handleMutationAlerts } from "../Alerts/MyToast";
import { roleOptions } from "@/lib/SelectOptions";

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

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <form onSubmit={handleSubmit(onSubmit ?? submitFunc)} noValidate>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite Team Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={"gray.500"} mb="20px">
              After submitting the form, the user will receive a link to assign
              a password to their account via email.
            </Text>
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
          </ModalBody>

          <ModalFooter>
            <Button isDisabled={isLoading || isSubmitting} type="submit" mr={3}>
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
