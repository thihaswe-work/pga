/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/blog/blogs/components/columns";
import { BlogDataTable } from "@/features/blog/blogs/components/data-table";
import {
  BlogDialog,
  DeleteDialog,
} from "@/features/blog/blogs/components/dialog";
import { Blog } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Blogs() {
  const navigate = useNavigate();
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<Blog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const handleViewClick = (homeDetail: Blog) => {
    setSelectedDetail(homeDetail);
    setDialogOpen(true);
  };
  const handleViewDelete = (homeDetail: Blog) => {
    setSelectedDetail(homeDetail);
    setDialogDelete(true);
  };
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
        <BlogDataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={data}
        />
        <BlogDialog
          blogDetail={selectedDetail}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
        <DeleteDialog
          blogDetail={selectedDetail}
          open={dialogDelete}
          setOpen={setDialogDelete}
        />
      </div>
    </ContentLayout>
  );
}
