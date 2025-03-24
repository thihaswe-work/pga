import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { getColumns } from "@/features/milestone/components/columns";

import { useMilestones } from "@/features/milestone/api/get-milestones";
import { useState } from "react";
import { Milestone } from "@/types/api";
import Loading from "@/components/loading/loading";
import { useDeleteMilestone } from "@/features/milestone/api/delete-milestone";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function MilestonePage() {
  const [selectedDetail, setSelectedDetail] = useState<Milestone | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [dialogDelete, setDialogDelete] = useState(false);

  const { data: milestones, isLoading, isError } = useMilestones({});
  const deleteMilestoneMutation = useDeleteMilestone({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.milestone.root.getHref());
        setDialogDelete(false);
        toast("Milestone Deleted");
      },
    },
  });
  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-red-500">Failed to fetch milestones.</p>;
  if (!milestones) return <p>no milestones found</p>;
  const handleViewClick = (detail: Milestone) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Milestone) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };

  return (
    <ContentLayout
      title="Milestones"
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.milestone.create.getHref());
          }}
        >
          Create New Milestone
        </Button>
      }
    >
      <div>
        <DataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={milestones?.data || []} // Use fetched data
          pagination={false}
        />
        {selectedDetail && (
          <>
            <OpenDialog<Milestone>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.milestone.edit.getHref(selectedDetail.id)}
            />
            <DeleteDialog<Milestone>
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              deleteFunc={() => {
                deleteMilestoneMutation.mutate({
                  milestoneId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
