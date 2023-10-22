import { MenuItem } from "@chakra-ui/react";
import type { Account } from "@prisma/client";
import React from "react";
import { handleUseMutationAlerts } from "@/components/Alerts/MyToast";
import { trpcClient } from "@/utils/api";

const AccountsRowOptions = ({
  x,
  setEditAccount,
  onEditOpen,
  setMenuData,
}: {
  onEditOpen: () => void;
  setEditAccount: React.Dispatch<React.SetStateAction<any | null>>;
  x: Account;
  setMenuData: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
      rowData: any | null;
    }>
  >;
}) => {
  const context = trpcClient.useContext();
  const closeMenu = () => {
    setMenuData((prev) => ({ ...prev, rowData: null }));
  };

  const { mutate } = trpcClient.accounts.toggleActivation.useMutation(
    handleUseMutationAlerts({
      successText: "User has been modified",
      callback: () => {
        context.users.invalidate();
        closeMenu();
      },
    }),
  );

  return (
    <>
      <MenuItem
        onClick={() => {
          mutate({ id: x.id, active: !x.active });
        }}
      >
        {x.active ? "Deactivate user" : "Reactivate user"}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setEditAccount(x);
          onEditOpen();
          closeMenu();
        }}
      >
        Edit role
      </MenuItem>
    </>
  );
};

export default AccountsRowOptions;
