import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useDeleteRegion } from "@/features/career/regions/api/delete-region";
import { useRegions } from "@/features/career/regions/api/get-regions";
import { getColumns } from "@/features/career/regions/components/columns";
import { Region } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Page() {
  const [selectedDetail, setSelectedDetail] = useState<Region | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useRegions({});
  const useDeleteRegionMutation = useDeleteRegion({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.blog.categories.root.getHref());
        setDialogDelete(false);
        toast("Region Deleted");
      },
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch banners.</p>;

  const handleViewClick = (detail: Region) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Region) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };
  return (
    <ContentLayout
      title={"Region"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.career.categories.create.getHref());
          }}
        >
          Create New Category
        </Button>
      }
    >
      <div className="">
        <DataTable
          search="name"
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={data?.data}
          pagination={true}
        />
        {selectedDetail && (
          <>
            <OpenDialog<Region>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.blog.categories.edit.getHref(
                selectedDetail.id
              )}
            />
            <DeleteDialog
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              deleteFunc={() => {
                useDeleteRegionMutation.mutate({
                  RegionId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
