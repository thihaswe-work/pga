import { ContentLayout } from "@/components/layouts/index";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { OpenDialog } from "@/components/table/dialog";
import { paths } from "@/config/paths";
import { useHomes } from "@/features/home/api/get-homes";
import { getColumns } from "@/features/home/components/columns";
import { Home } from "@/types/api";
import { useState } from "react";

// async function getData(): Promise<Home[]> {
//   return [
//     {
//       id: 1,
//       sectionType: "Section 1",
//       image: "/office.svg",
//       header: "300+",
//       label: "Get Started",
//       description:
//         "Discover the best features we offer and start your journey today!",
//       status: true,
//       createdAt: "2024-03-11T10:00:00Z",
//       updatedAt: "2024-03-11T12:00:00Z",
//     },
//     {
//       id: 2,
//       sectionType: "Section 2",
//       image: "/office.svg",

//       header: "300+",

//       label: "Latest News",
//       description:
//         "Check out our latest updates and improvements in the platform.",
//       status: false,
//       createdAt: "2024-03-10T09:30:00Z",
//       updatedAt: "2024-03-11T11:30:00Z",
//     },
//     {
//       id: 3,
//       sectionType: "Section 3",
//       image: "/office.svg",
//       header: "300+",

//       label: "News Flash",
//       description:
//         "Stay updated with the latest breaking news and trending topics.",
//       status: true,
//       createdAt: "2024-03-09T14:45:00Z",
//       updatedAt: "2024-03-11T10:15:00Z",
//     },
//     {
//       id: 4,
//       sectionType: "Section 4",
//       image: "/office.svg",
//       header: "500+",

//       label: "News stack",
//       description:
//         "Stay updated with the latest breaking news and trending topics.",
//       status: true,
//       createdAt: "2024-03-09T14:45:00Z",
//       updatedAt: "2024-03-11T10:15:00Z",
//     },
//   ];
// }
export default function HomePage() {
  const [selectedDetail, setSelectedDetail] = useState<Home | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Use the custom query hook
  const { data: homes, isLoading, isError } = useHomes({});

  const handleViewClick = (detail: Home) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch homes.</p>;

  return (
    <ContentLayout title="Home Page">
      <div>
        <DataTable
          columns={getColumns(handleViewClick)}
          data={homes?.data || []} // Use fetched data
          pagination={false}
        />
        {selectedDetail && (
          <OpenDialog<Home>
            detail={selectedDetail}
            open={dialogOpen}
            setOpen={setDialogOpen}
            uploadedDate={selectedDetail?.createdAt}
            navlink={paths.app.home.edit.getHref(selectedDetail?.sectionType)}
          />
        )}
      </div>
    </ContentLayout>
  );
}
