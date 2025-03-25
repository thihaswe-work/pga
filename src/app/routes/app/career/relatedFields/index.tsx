import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useDeleteRelatedField } from "@/features/career/relatedFields/api/delete-relatedField";
import { useRelatedFields } from "@/features/career/relatedFields/api/get-relatedFields";
import { getColumns } from "@/features/career/relatedFields/components/columns";
import { RelatedField } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Page() {
  const [selectedDetail, setSelectedDetail] = useState<RelatedField | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useRelatedFields({});
  const useDeleteRelatedFieldMutation = useDeleteRelatedField({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.career.relatedFields.root.getHref());
        setDialogDelete(false);
        toast("RelatedField Deleted");
      },
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch banners.</p>;

  const handleViewClick = (detail: RelatedField) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: RelatedField) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };
  return (
    <ContentLayout
      title={"RelatedField"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.career.categories.create.getHref());
          }}
        >
          Create New RelatedField
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
            <OpenDialog<RelatedField>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.career.relatedFields.edit.getHref(
                selectedDetail.id
              )}
            />
            <DeleteDialog
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              deleteFunc={() => {
                useDeleteRelatedFieldMutation.mutate({
                  RelatedFieldId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
