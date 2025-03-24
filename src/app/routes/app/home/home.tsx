import { ContentLayout } from "@/components/layouts/index";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { OpenDialog } from "@/components/table/dialog";
import { paths } from "@/config/paths";
import { useHomes } from "@/features/home/api/get-homes";
import { getColumns } from "@/features/home/components/columns";
import { Home } from "@/types/api";
import { useState } from "react";

export default function HomePage() {
  const [selectedDetail, setSelectedDetail] = useState<Home | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Use the custom query hook
  const { data: homes, isLoading, isError } = useHomes({});

  const handleViewClick = (detail: Home) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch homes.</p>;

  return (
    <ContentLayout title="Home Page">
      <div>
        <DataTable
          columns={getColumns(handleViewClick)}
          data={homes?.data || []} // Use fetched data
          pagination={false}
        />
        {selectedDetail && (
          <OpenDialog<Home>
            detail={selectedDetail}
            open={dialogOpen}
            setOpen={setDialogOpen}
            uploadedDate={selectedDetail?.createdAt}
            navlink={paths.app.home.edit.getHref(selectedDetail?.sectionType)}
          />
        )}
      </div>
    </ContentLayout>
  );
}
