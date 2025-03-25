import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { getColumns } from "@/features/milestone/components/columns";
import { useMilestones } from "@/features/milestone/api/get-milestones";
import { useState } from "react";
import { Milestone } from "@/types/api";
import Loading from "@/components/loading/loading";
import { useDeleteMilestone } from "@/features/milestone/api/delete-milestone";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TiptapEditor, Tpp } from "@/features/blog/blogs/components/tiptap";

export default function MilestonePage() {
  const [selectedDetail, setSelectedDetail] = useState<Milestone | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [dialogDelete, setDialogDelete] = useState(false);

  const { data: milestones, isLoading, isError } = useMilestones({});
  const deleteMilestoneMutation = useDeleteMilestone({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.milestone.root.getHref());
        setDialogDelete(false);
        toast("Milestone Deleted");
      },
    },
  });
  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-red-500">Failed to fetch milestones.</p>;
  if (!milestones) return <p>no milestones found</p>;

  // const milestones: Milestone[] = [
  //   {
  //     id: 1,
  //     title: "Initial Planning & Research",
  //     description:
  //       "Define project goals, gather requirements, and outline the roadmap.",
  //     status: true,
  //     timeline: 7,
  //     link: "#",
  //     image: "/office.svg",
  //     icon: "/office.svg",
  //     colorCode: "#4CAF50",
  //     createdAt: "2025-03-25",
  //     updatedAt: "2025-03-25",
  //   },
  //   {
  //     id: 2,
  //     title: "Configure SQLite & API Structure",
  //     description:
  //       "Set up SQLite database and define API endpoints for data access.",
  //     status: false,
  //     timeline: 10,
  //     link: "#",
  //     image: "/office.svg",
  //     icon: "/office.svg",
  //     colorCode: "#2196F3",
  //     createdAt: "2025-03-25",
  //     updatedAt: "2025-03-25",
  //   },
  //   {
  //     id: 3,
  //     title: "Implement Zustand Authentication",
  //     description:
  //       "Integrate user authentication using Zustand for state management.",
  //     status: false,
  //     timeline: 14,
  //     link: "#",
  //     image: "/office.svg",
  //     icon: "/office.svg",
  //     colorCode: "#FF9800",
  //     createdAt: "2025-03-25",
  //     updatedAt: "2025-03-25",
  //   },
  //   {
  //     id: 4,
  //     title: "Build Expense Tracking UI",
  //     description:
  //       "Develop the front-end interface for adding, editing, and deleting expenses.",
  //     status: false,
  //     timeline: 21,
  //     link: "#",
  //     image: "/office.svg",
  //     icon: "/office.svg",
  //     colorCode: "#E91E63",
  //     createdAt: "2025-03-25",
  //     updatedAt: "2025-03-25",
  //   },
  //   {
  //     id: 5,
  //     title: "Final Testing & App Launch",
  //     description: "Perform rigorous testing and deploy the app for users.",
  //     status: false,
  //     timeline: 30,
  //     link: "#",
  //     image: "/office.svg",
  //     icon: "/office.svg",
  //     colorCode: "#9C27B0",
  //     createdAt: "2025-03-25",
  //     updatedAt: "2025-03-25",
  //   },
  // ];

  const handleViewClick = (detail: Milestone) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Milestone) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };
  // const [content, setContent] = useState("");

  return (
    <ContentLayout
      title="Milestones"
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.milestone.create.getHref());
          }}
        >
          Create New Milestone
        </Button>
      }
    >
      <div>
        <DataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={milestones.data || []} // Use fetched data
          pagination={false}
        />
        {selectedDetail && (
          <>
            <OpenDialog<Milestone>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.milestone.edit.getHref(selectedDetail.id)}
            />
            <DeleteDialog<Milestone>
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              deleteFunc={() => {
                deleteMilestoneMutation.mutate({
                  milestoneId: selectedDetail.id,
                });
              }}
            />
          </>
        )}
      </div>
      {/* <TiptapEditor setContent={setContent} />
      <Tpp content={content} /> */}
    </ContentLayout>
  );
}
