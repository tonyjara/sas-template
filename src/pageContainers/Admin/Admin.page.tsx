import DynamicTable from "@/components/DynamicTables/DynamicTable";
import { useDynamicTable } from "@/components/DynamicTables/UseDynamicTable";
import { trpcClient } from "@/utils/api";
import { adminLogsColumns } from "@/pageContainers/Admin/AdminLogs.columns";
import PageContainer from "@/components/AudioPlayer/Containers/PageContainer";

const AdminPage = () => {
  const dynamicTableProps = useDynamicTable();

  const { data: logs } = trpcClient.logs.getLogs.useQuery();

  return (
    <PageContainer>
      <DynamicTable
        title={"Admin logs"}
        data={logs ?? []}
        columns={adminLogsColumns()}
        {...dynamicTableProps}
      />
    </PageContainer>
  );
};
export default AdminPage;
