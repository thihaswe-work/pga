import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { Banner, getColumns } from "@/features/banner/components/columns";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
async function getData(): Promise<Banner[]> {
  return [
    {
      id: 1,
      status: false,
      image: "/office.svg",
      createdAt: "2024-03-11T10:00:00Z",
      updatedAt: "2024-03-11T12:00:00Z",
    },
    {
      id: 2,
      image: "/office.svg",

      status: false,
      createdAt: "2024-03-10T09:30:00Z",
      updatedAt: "2024-03-11T11:30:00Z",
    },
    {
      id: 3,
      image: "/office.svg",

      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
    {
      id: 4,
      image: "/office.svg",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
  ];
}
export default function BannerPage() {
  const [data, setData] = useState<Banner[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<Banner | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    // setTimeout(() => {
    fetchData();
    // }, 3000);
  }, []);
  const handleViewClick = (detail: Banner) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Banner) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };

  return (
    <ContentLayout
      title={"Banner"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.banner.create.getHref());
          }}
        >
          Create New Banner
        </Button>
      }
    >
      <div className="">
        <DataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={data}
          pagination={false}
        />
        {selectedDetail && (
          <>
            <OpenDialog
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.banner.edit.getHref(selectedDetail.id)}
            />
            <DeleteDialog
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
