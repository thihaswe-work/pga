/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";

import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useDeleteBlog } from "@/features/blog/blogs/api/delete-blog";
import { useBlogs } from "@/features/blog/blogs/api/get-blogs";
import { getColumns } from "@/features/blog/blogs/components/columns";
import {
  BlogDialog,
  DeleteDialog,
} from "@/features/blog/blogs/components/dialog";
import { useBlogCategories } from "@/features/blog/categories/api/get-blogCategories";

import { Blog } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Blogs() {
  const navigate = useNavigate();

  const [selectedDetail, setSelectedDetail] = useState<Blog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const { data: categories } = useBlogCategories({});
  const { data, isLoading, isError } = useBlogs({});

  const handleViewClick = (detail: Blog) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Blog) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };
  const deleteBlogMutation = useDeleteBlog({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.blog.blogs.root.getHref());
        setDialogDelete(false);
        toast("Blog Deleted");
      },
    },
  });

  if (isLoading && !categories) return <Loading />;
  if (isError && !categories)
    return <p className="text-red-500">Failed to fetch banners.</p>;

  return (
    <ContentLayout
      title={"Blogs"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.blog.blogs.create.getHref());
          }}
        >
          Create New Blog
        </Button>
      }
    >
      <div className="">
        <DataTable
          search="title"
          columns={getColumns(
            handleViewClick,
            handleViewDelete,
            categories?.data
          )}
          data={data?.data}
          pagination={true}
        />
        {selectedDetail && (
          <>
            <BlogDialog
              categories={categories?.data}
              blogDetail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
            />
            <DeleteDialog
              categories={categories?.data}
              blogDetail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              deleteFunc={() => {
                deleteBlogMutation.mutate({
                  blogId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
