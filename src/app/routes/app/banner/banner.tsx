import { ContentLayout } from "@/components/layouts/content-layout";
import { Banner, getColumns } from "@/features/banner/columns";
import { BannerDataTable } from "@/features/banner/data-table";
import { BannerDialog } from "@/features/banner/dialog";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<Banner | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
  const handleViewClick = (homeDetail: Banner) => {
    setSelectedDetail(homeDetail);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-10 h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <ContentLayout title={"title"}>
      <div className="">
        <BannerDataTable columns={getColumns(handleViewClick)} data={data} />
        <BannerDialog
          homeDetail={selectedDetail}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
    </ContentLayout>
  );
}
