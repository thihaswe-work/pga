import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useDeleteHiringPost } from "@/features/career/hiringPost/api/delete-hiringPost";
import { useHiringPosts } from "@/features/career/hiringPost/api/get-hiringPosts";
import { getColumns } from "@/features/career/hiringPost/components/columns";

import { HiringPost } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Page() {
  const [selectedDetail, setSelectedDetail] = useState<HiringPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useHiringPosts({});
  const useDeleteHiringPostMutation = useDeleteHiringPost({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.career.hiringPost.root.getHref());
        setDialogDelete(false);
        toast("HiringPost Deleted");
      },
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-red-500">Failed to fetch HiringPost.</p>;

  const handleViewClick = (detail: HiringPost) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: HiringPost) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };
  return (
    <ContentLayout
      title={"HiringPost"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.career.hiringPost.create.getHref());
          }}
        >
          Create New HiringPost
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
            <OpenDialog<HiringPost>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.career.hiringPost.edit.getHref(
                selectedDetail.id
              )}
            />
            <DeleteDialog
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              deleteFunc={() => {
                useDeleteHiringPostMutation.mutate({
                  HiringPostId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
