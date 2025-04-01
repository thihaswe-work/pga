import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/roleAndPermission/components/columns";
import { RoleAndPermission } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Roles() {
  const [selectedDetail, setSelectedDetail] =
    useState<RoleAndPermission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [dialogDelete, setDialogDelete] = useState(false);

  // const { data: milestones, isLoading, isError } = useMilestones({});
  // const deleteMilestoneMutation = useDeleteMilestone({
  //   mutationConfig: {
  //     onSuccess: () => {
  //       navigate(paths.app.milestone.root.getHref());
  //       setDialogDelete(false);
  //       toast("Milestone Deleted");
  //     },
  //   },
  // });

  // if (isLoading) return <Loading />;
  // if (isError)
  //   return <p className="text-red-500">Failed to fetch milestones.</p>;
  // if (!milestones) return <p>no milestones found</p>;
  const fakeRolesAndPermissions: RoleAndPermission[] = [
    {
      id: 1,
      role: "Admin",
      systemModules: ["User Management", "Reports", "Settings"],
      permission: { read: true, write: true, delete: true },
      status: true,
      createdAt: "2024-03-01T12:00:00Z",
      updatedAt: "2024-03-10T15:30:00Z",
    },
    {
      id: 2,
      role: "Editor",
      systemModules: ["Content Management", "Media Library"],
      permission: { read: true, write: true, delete: false },
      status: true,
      createdAt: "2024-02-15T10:45:00Z",
      updatedAt: "2024-03-05T11:20:00Z",
    },
    {
      id: 3,
      role: "Viewer",
      systemModules: ["Dashboard", "Reports"],
      permission: { read: true, write: false, delete: false },
      status: true,
      createdAt: "2024-01-20T09:30:00Z",
      updatedAt: "2024-02-28T08:10:00Z",
    },
    {
      id: 4,
      role: "Moderator",
      systemModules: ["User Management", "Community Guidelines"],
      permission: { read: true, write: false, delete: true },
      status: false,
      createdAt: "2024-02-10T14:15:00Z",
      updatedAt: "2024-03-01T16:45:00Z",
    },
    {
      id: 5,
      role: "Super Admin",
      systemModules: ["All Modules"],
      permission: { read: true, write: true, delete: true },
      status: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-03-12T18:00:00Z",
    },
  ];

  const handleViewClick = (detail: RoleAndPermission) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: RoleAndPermission) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };

  return (
    <ContentLayout
      title="Milestones"
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.roleAndPermission.create.getHref());
          }}
        >
          Create New Milestone
        </Button>
      }
    >
      <div>
        <DataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={fakeRolesAndPermissions || []} // Use fetched data
          pagination={false}
        />
        {selectedDetail && (
          <>
            <OpenDialog<RoleAndPermission>
              detail={selectedDetail}
              open={dialogOpen}
              setOpen={setDialogOpen}
              navlink={paths.app.milestone.edit.getHref(selectedDetail.id)}
            />
            <DeleteDialog<RoleAndPermission>
              detail={selectedDetail}
              open={dialogDelete}
              setOpen={setDialogDelete}
              // deleteFunc={() => {
              //   deleteMilestoneMutation.mutate({
              //     milestoneId: selectedDetail.id,
              //   });
              // }}
              deleteFunc={() => {
                console.log("delete role and permission");
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
