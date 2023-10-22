import DynamicTable from "@/components/DynamicTables/DynamicTable";
import { useDynamicTable } from "@/components/DynamicTables/UseDynamicTable";
import { trpcClient } from "@/utils/api";
import { adminLogsColumns } from "@/pageContainers/Admin/AdminLogs.columns";

const AdminPage = () => {
  const dynamicTableProps = useDynamicTable();

  const { data: logs } = trpcClient.logs.getLogs.useQuery();

  return (
    <div>
      <DynamicTable
        title={"Admin logs"}
        data={logs ?? []}
        columns={adminLogsColumns()}
        {...dynamicTableProps}
      />
    </div>
  );
};
export default AdminPage;
