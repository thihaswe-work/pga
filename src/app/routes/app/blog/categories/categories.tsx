import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/blog/categories/components/columns";

import { BlogCategoryDataTable } from "@/features/blog/categories/components/data-table";
import {
  BlogCategoryDialog,
  DeleteDialog,
} from "@/features/blog/categories/components/dialog";
import { BlogCategory } from "@/types/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
async function getData(): Promise<BlogCategory[]> {
  return [
    {
      id: 1,
      status: false,
      name: "blogcategory",
      createdAt: "2024-03-11T10:00:00Z",
      updatedAt: "2024-03-11T12:00:00Z",
    },
    {
      id: 2,
      name: "blogcategory",
      status: false,
      createdAt: "2024-03-10T09:30:00Z",
      updatedAt: "2024-03-11T11:30:00Z",
    },
    {
      id: 3,
      name: "blogcategory",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
    {
      id: 4,
      name: "blogcategory",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
  ];
}
export default function CategoryPage() {
  const [data, setData] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<BlogCategory | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }
    // setTimeout(() => {
    fetchData();
    // }, 3000);
  }, []);
  const handleViewClick = (homeDetail: BlogCategory) => {
    setSelectedDetail(homeDetail);
    setDialogOpen(true);
  };
  const handleViewDelete = (homeDetail: BlogCategory) => {
    setSelectedDetail(homeDetail);
    setDialogDelete(true);
  };

  if (loading) {
    return (
      <div className="text-center py-10 h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <ContentLayout
      title={"Category"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.blog.categories.create.getHref());
          }}
        >
          Create New Category
        </Button>
      }
    >
      <div className="">
        <BlogCategoryDataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={data}
        />
        <BlogCategoryDialog
          blogCategoryDetail={selectedDetail}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
        <DeleteDialog
          blogCategoryDetail={selectedDetail}
          open={dialogDelete}
          setOpen={setDialogDelete}
        />
      </div>
    </ContentLayout>
  );
}
