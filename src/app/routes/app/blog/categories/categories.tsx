import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/table/data-table";
import { OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/blog/categories/components/columns";

import { DeleteDialog } from "@/features/blog/categories/components/dialog";
import { BlogCategory } from "@/types/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
async function getData(): Promise<BlogCategory[]> {
  return [
    {
      id: 1,
      name: "tech",
      status: false,
      createdAt: "2024-03-11T10:00:00Z",
      updatedAt: "2024-03-11T12:00:00Z",
    },
    {
      id: 2,
      name: "health",
      status: false,
      createdAt: "2024-03-10T09:30:00Z",
      updatedAt: "2024-03-11T11:30:00Z",
    },
    {
      id: 3,
      name: "lifestyle",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
    {
      id: 4,
      name: "finance",
      status: true,
      createdAt: "2024-03-08T12:00:00Z",
      updatedAt: "2024-03-10T15:30:00Z",
    },
    {
      id: 5,
      name: "education",
      status: false,
      createdAt: "2024-03-07T11:20:00Z",
      updatedAt: "2024-03-09T14:10:00Z",
    },
    {
      id: 6,
      name: "sports",
      status: true,
      createdAt: "2024-03-06T08:15:00Z",
      updatedAt: "2024-03-08T13:45:00Z",
    },
    {
      id: 7,
      name: "travel",
      status: false,
      createdAt: "2024-03-05T07:00:00Z",
      updatedAt: "2024-03-07T10:25:00Z",
    },
    {
      id: 8,
      name: "food",
      status: true,
      createdAt: "2024-03-04T16:10:00Z",
      updatedAt: "2024-03-06T11:40:00Z",
    },
    {
      id: 9,
      name: "science",
      status: false,
      createdAt: "2024-03-03T14:55:00Z",
      updatedAt: "2024-03-05T09:30:00Z",
    },
    {
      id: 10,
      name: "fashion",
      status: true,
      createdAt: "2024-03-02T13:45:00Z",
      updatedAt: "2024-03-04T08:20:00Z",
    },
    {
      id: 11,
      name: "entertainment",
      status: false,
      createdAt: "2024-03-01T12:30:00Z",
      updatedAt: "2024-03-03T14:50:00Z",
    },
    {
      id: 12,
      name: "gaming",
      status: true,
      createdAt: "2024-02-29T11:15:00Z",
      updatedAt: "2024-03-02T16:10:00Z",
    },
    {
      id: 13,
      name: "history",
      status: false,
      createdAt: "2024-02-28T09:45:00Z",
      updatedAt: "2024-03-01T12:30:00Z",
    },
    {
      id: 14,
      name: "art",
      status: true,
      createdAt: "2024-02-27T08:10:00Z",
      updatedAt: "2024-02-29T10:45:00Z",
    },
    {
      id: 15,
      name: "business",
      status: false,
      createdAt: "2024-02-26T14:00:00Z",
      updatedAt: "2024-02-28T15:40:00Z",
    },
    {
      id: 16,
      name: "photography",
      status: true,
      createdAt: "2024-02-25T12:20:00Z",
      updatedAt: "2024-02-27T13:50:00Z",
    },
    {
      id: 17,
      name: "automotive",
      status: false,
      createdAt: "2024-02-24T10:10:00Z",
      updatedAt: "2024-02-26T11:45:00Z",
    },
    {
      id: 18,
      name: "politics",
      status: true,
      createdAt: "2024-02-23T08:45:00Z",
      updatedAt: "2024-02-25T09:50:00Z",
    },
    {
      id: 19,
      name: "environment",
      status: false,
      createdAt: "2024-02-22T07:30:00Z",
      updatedAt: "2024-02-24T08:40:00Z",
    },
    {
      id: 20,
      name: "culture",
      status: true,
      createdAt: "2024-02-21T16:20:00Z",
      updatedAt: "2024-02-23T17:10:00Z",
    },
    {
      id: 21,
      name: "movies",
      status: false,
      createdAt: "2024-02-20T14:15:00Z",
      updatedAt: "2024-02-22T15:30:00Z",
    },
    {
      id: 22,
      name: "books",
      status: true,
      createdAt: "2024-02-19T12:00:00Z",
      updatedAt: "2024-02-21T13:20:00Z",
    },
    {
      id: 23,
      name: "DIY",
      status: false,
      createdAt: "2024-02-18T10:50:00Z",
      updatedAt: "2024-02-20T11:55:00Z",
    },
    {
      id: 24,
      name: "parenting",
      status: true,
      createdAt: "2024-02-17T08:30:00Z",
      updatedAt: "2024-02-19T09:40:00Z",
    },
    {
      id: 25,
      name: "pets",
      status: false,
      createdAt: "2024-02-16T07:10:00Z",
      updatedAt: "2024-02-18T08:30:00Z",
    },
    {
      id: 26,
      name: "relationships",
      status: true,
      createdAt: "2024-02-15T16:50:00Z",
      updatedAt: "2024-02-17T17:30:00Z",
    },
    {
      id: 27,
      name: "fitness",
      status: false,
      createdAt: "2024-02-14T14:40:00Z",
      updatedAt: "2024-02-16T15:10:00Z",
    },
    {
      id: 28,
      name: "mindfulness",
      status: true,
      createdAt: "2024-02-13T12:30:00Z",
      updatedAt: "2024-02-15T13:45:00Z",
    },
    {
      id: 29,
      name: "self-improvement",
      status: false,
      createdAt: "2024-02-12T10:20:00Z",
      updatedAt: "2024-02-14T11:40:00Z",
    },
    {
      id: 30,
      name: "music",
      status: true,
      createdAt: "2024-02-11T08:00:00Z",
      updatedAt: "2024-02-13T09:30:00Z",
    },
    {
      id: 31,
      name: "spirituality",
      status: false,
      createdAt: "2024-02-10T07:15:00Z",
      updatedAt: "2024-02-12T08:50:00Z",
    },
    {
      id: 32,
      name: "psychology",
      status: true,
      createdAt: "2024-02-09T16:10:00Z",
      updatedAt: "2024-02-11T17:40:00Z",
    },
    {
      id: 33,
      name: "cryptocurrency",
      status: false,
      createdAt: "2024-02-08T14:45:00Z",
      updatedAt: "2024-02-10T15:30:00Z",
    },
    {
      id: 34,
      name: "investment",
      status: true,
      createdAt: "2024-02-07T12:30:00Z",
      updatedAt: "2024-02-09T13:50:00Z",
    },
    {
      id: 35,
      name: "startups",
      status: false,
      createdAt: "2024-02-06T10:20:00Z",
      updatedAt: "2024-02-08T11:40:00Z",
    },
    {
      id: 36,
      name: "productivity",
      status: true,
      createdAt: "2024-02-05T08:10:00Z",
      updatedAt: "2024-02-07T09:30:00Z",
    },
    {
      id: 37,
      name: "marketing",
      status: false,
      createdAt: "2024-02-04T07:00:00Z",
      updatedAt: "2024-02-06T08:30:00Z",
    },
    {
      id: 38,
      name: "design",
      status: true,
      createdAt: "2024-02-03T16:50:00Z",
      updatedAt: "2024-02-05T17:40:00Z",
    },
    {
      id: 39,
      name: "AI",
      status: false,
      createdAt: "2024-02-02T14:40:00Z",
      updatedAt: "2024-02-04T15:20:00Z",
    },
    {
      id: 40,
      name: "coding",
      status: true,
      createdAt: "2024-02-01T12:30:00Z",
      updatedAt: "2024-02-03T13:45:00Z",
    },
  ];
}

export default function CategoryPage() {
  const [data, setData] = useState<BlogCategory[]>([]);
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
    }

    fetchData();
  }, []);
  const handleViewClick = (detail: BlogCategory) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: BlogCategory) => {
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
            navigate(paths.app.blog.categories.create.getHref());
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
          data={data}
          pagination={true}
        />
        {selectedDetail && (
          <>
            <OpenDialog<BlogCategory>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.blog.categories.edit.getHref(
                selectedDetail.id
              )}
            />
            <DeleteDialog
              blogCategoryDetail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
