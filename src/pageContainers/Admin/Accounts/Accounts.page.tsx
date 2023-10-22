import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import type { RowOptionsType } from "@/components/DynamicTables/DynamicTable";
import DynamicTable from "@/components/DynamicTables/DynamicTable";
import { useDynamicTable } from "@/components/DynamicTables/UseDynamicTable";
import { trpcClient } from "@/utils/api";
import EditAccountModal from "@/components/Modals/EditAccount.modal";
import { accountsColumns } from "./Accounts.columns";
import AccountsRowOptions from "./Accounts.rowOptions";

const AccountsPage = () => {
  const [editAccount, setEditAccount] = useState<any | null>(null);
  const dynamicTableProps = useDynamicTable();
  const { pageIndex, pageSize, sorting } = dynamicTableProps;

  const { data, isFetching, isLoading } = trpcClient.accounts.getMany.useQuery({
    pageIndex,
    pageSize,
    sorting,
  });
  const { data: count } = trpcClient.accounts.count.useQuery();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    if (!isEditOpen && editAccount) {
      setEditAccount(null);
    }
    return () => {};
  }, [editAccount, isEditOpen]);

  const rowOptionsFunction: RowOptionsType = ({ x, setMenuData }) => {
    return (
      <AccountsRowOptions
        x={x}
        onEditOpen={onEditOpen}
        setEditAccount={setEditAccount}
        setMenuData={setMenuData}
      />
    );
  };

  return (
    <>
      <DynamicTable
        title={"Accounts"}
        columns={accountsColumns({
          pageIndex,
          pageSize,
        })}
        loading={isFetching || isLoading}
        data={data ?? []}
        count={count ?? 0}
        rowOptions={rowOptionsFunction}
        {...dynamicTableProps}
      />
      {editAccount && (
        <EditAccountModal
          account={editAccount}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </>
  );
};

export default AccountsPage;
