/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/blog/blogs/components/columns";
import { BlogDataTable } from "@/features/blog/blogs/components/data-table";
import {
  BlogDialog,
  DeleteDialog,
} from "@/features/blog/blogs/components/dialog";
import { Blog, BlogCategory } from "@/types/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
async function getData(): Promise<Blog[]> {
  return [
    {
      id: 1,
      status: false,
      title: "blogcategory",
      categoryId: 1,
      description: `ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?`,
      image: "/office.svg",
      createdAt: "2024-03-11T10:00:00Z",
      updatedAt: "2024-03-11T12:00:00Z",
    },
    {
      id: 2,
      title: "blogcategory",
      categoryId: 1,
      description: `ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?`,
      image: "/office.svg",
      status: false,
      createdAt: "2024-03-10T09:30:00Z",
      updatedAt: "2024-03-11T11:30:00Z",
    },
    {
      id: 3,
      title: "blogcategory",
      categoryId: 2,
      description: `ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?`,
      image: "/office.svg",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
    {
      id: 4,
      title: "blogcategory",
      categoryId: 2,
      description: `ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum repudiandae eum distinctio?`,
      image: "/office.svg",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
  ];
}

const categories: BlogCategory[] = [
  {
    id: 1,
    name: "Electronics",
    status: true,
    createdAt: "2024-03-09T14:45:00Z",
    updatedAt: "2024-03-11T10:15:00Z",
  },
  {
    id: 2,
    name: "Clothing",
    status: true,
    createdAt: "2024-03-09T14:45:00Z",
    updatedAt: "2024-03-11T10:15:00Z",
  },
];
export default function Blogs() {
  const navigate = useNavigate();
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<Blog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
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
  const handleViewClick = (detail: Blog) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Blog) => {
    setSelectedDetail(detail);
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
          columns={getColumns(handleViewClick, handleViewDelete, categories)}
          data={data}
        />
        <BlogDialog
          categories={categories}
          blogDetail={selectedDetail}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
        <DeleteDialog
          categories={categories}
          blogDetail={selectedDetail}
          open={dialogDelete}
          setOpen={setDialogDelete}
        />
      </div>
    </ContentLayout>
  );
}
