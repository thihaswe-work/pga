import { ContentLayout } from "@/components/layouts/index";
import { DataTable } from "@/components/table/data-table";
import { OpenDialog } from "@/components/table/dialog";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/home/components/columns";
import { Home } from "@/types/api";
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
  const [data, setData] = useState<Home[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<Home | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  const handleViewClick = (detail: Home) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };

  return (
    <ContentLayout title="Home Page">
      <div className="">
        <DataTable
          columns={getColumns(handleViewClick)}
          data={data}
          pagination={false}
        />
        {/* Pass the required props to OpenDialog */}
        {selectedDetail && (
          <OpenDialog<Home> // Pass Home as the type argument for T
            detail={selectedDetail} // Detail of type Home
            open={dialogOpen} // Dialog open state
            setOpen={setDialogOpen} // Function to toggle dialog state
            uploadedDate={selectedDetail?.createdAt} // Optional uploaded date
            navlink={paths.app.home.edit.getHref(selectedDetail?.sectionType)} // Navigation link function
          />
        )}
      </div>
    </ContentLayout>
  );
}
