import { ContentLayout } from "@/components/layouts/content-layout";
import { getColumns, Home } from "@/features/home/components/columns";
import { HomeDataTable } from "@/features/home/components/data-table";
import { HomeDialog } from "@/features/home/components/dialog";
import { useEffect, useState } from "react";

async function getData(): Promise<Home[]> {
  return [
    {
      id: 1,
      sectionType: "Section 1",
      image: "/office.svg",
      header: "300+",
      label: "Get Started",
      description:
        "Discover the best features we offer and start your journey today!",
      status: true,
      createdAt: "2024-03-11T10:00:00Z",
      updatedAt: "2024-03-11T12:00:00Z",
    },
    {
      id: 2,
      sectionType: "Section 2",
      image: "/office.svg",

      header: "300+",

      label: "Latest News",
      description:
        "Check out our latest updates and improvements in the platform.",
      status: false,
      createdAt: "2024-03-10T09:30:00Z",
      updatedAt: "2024-03-11T11:30:00Z",
    },
    {
      id: 3,
      sectionType: "Section 3",
      image: "/office.svg",
      header: "300+",

      label: "News Flash",
      description:
        "Stay updated with the latest breaking news and trending topics.",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
    {
      id: 4,
      sectionType: "Section 4",
      image: "/office.svg",
      header: "500+",

      label: "News stack",
      description:
        "Stay updated with the latest breaking news and trending topics.",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
  ];
}

export default function HomePage() {
  // Pass handleViewClick as the onViewClick prop to DataTable

  const [data, setData] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<Home | null>(null);
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
  const handleViewClick = (homeDetail: Home) => {
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
    <ContentLayout title="home">
      <div className="">
        <HomeDataTable columns={getColumns(handleViewClick)} data={data} />
        <HomeDialog
          homeDetail={selectedDetail}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
    </ContentLayout>
  );
}
