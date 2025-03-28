import { ContentLayout } from "@/components/layouts/index";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { OpenDialog } from "@/components/table/dialog";
import { paths } from "@/config/paths";
import { useAboutUss } from "@/features/aboutus/api/get-aboutUss";
import { getColumns } from "@/features/aboutus/components/columns";

import { AboutUs } from "@/types/api";
import { useState } from "react";

export default function AboutUsPage() {
  const [selectedDetail, setSelectedDetail] = useState<AboutUs | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Use the custom query hook
  const { data: AboutUss, isLoading, isError } = useAboutUss({});

  const handleViewClick = (detail: AboutUs) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch AboutUss.</p>;

  return (
    <ContentLayout title="AboutUs Page">
      <div>
        <DataTable
          columns={getColumns(handleViewClick)}
          data={AboutUss?.data || []} // Use fetched data
          pagination={false}
        />
        {selectedDetail && (
          <OpenDialog<AboutUs>
            detail={selectedDetail}
            open={dialogOpen}
            setOpen={setDialogOpen}
            uploadedDate={selectedDetail?.createdAt}
            navlink={paths.app.aboutus.edit.getHref(
              selectedDetail?.sectionType
            )}
          />
        )}
      </div>
    </ContentLayout>
  );
}
