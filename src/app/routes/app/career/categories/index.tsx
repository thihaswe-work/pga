/* eslint-disable react-hooks/rules-of-hooks */
import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useDeleteBlogCategory } from "@/features/blog/categories/api/delete-blogCategory";
import { useBlogCategories } from "@/features/blog/categories/api/get-blogCategories";
import { getColumns } from "@/features/career/categories/components/columns";

import { CareerCategory } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function CategoryPage() {
  const [selectedDetail, setSelectedDetail] = useState<CareerCategory | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useBlogCategories({});
  const deleteBlogCategoryMutation = useDeleteBlogCategory({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.blog.categories.root.getHref());
        setDialogDelete(false);
        toast("Category Deleted");
      },
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch banners.</p>;

  const handleViewClick = (detail: CareerCategory) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: CareerCategory) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };

  return (
    <ContentLayout
      title={"Category"}
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
            <OpenDialog<CareerCategory>
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
                deleteBlogCategoryMutation.mutate({
                  blogCategoryId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
