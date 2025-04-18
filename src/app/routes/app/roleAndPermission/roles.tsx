/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { getColumns } from "@/features/roleAndPermission/components/columns";
import { RoleDialog } from "@/features/roleAndPermission/components/dialog";
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
      systemModules: {
        systemModules1: {
          homePage: { edit: true, view: true },
          aboutUs: { edit: true, view: true },
        },
        systemModules2: {
          milestones: { create: true, edit: true, view: true, delete: true },
          banners: { create: true, edit: true, view: true, delete: true },
          blogs: { create: true, edit: true, view: true, delete: true },
          careers: { create: true, edit: true, view: true, delete: true },
        },
        systemModules3: {
          jobApplicationForms: { reply: true, view: true, delete: true },
          contactMessages: { reply: true, view: true, delete: true },
        },
        maintenance: {
          rolesAndPermissions: {
            create: true,
            edit: true,
            view: true,
            delete: true,
          },
          userMaintain: { create: true, edit: true, view: true, delete: true },
        },
      },
      status: true,
      permission: {
        canCreate: true,
        canView: true,
        canEdit: true,
        canDelete: true,
        canReply: true,
      },
      createdAt: "2024-03-01T12:00:00Z",
      updatedAt: "2024-03-10T15:30:00Z",
    },
    {
      id: 2,
      role: "Editor",
      systemModules: {
        systemModules1: {
          homePage: { edit: true, view: true },
          aboutUs: { edit: true, view: true },
        },
        systemModules2: {
          milestones: { create: true, edit: true, view: true, delete: false },
          banners: { create: true, edit: true, view: true, delete: false },
          blogs: { create: true, edit: true, view: true, delete: false },
          careers: { create: true, edit: true, view: true, delete: false },
        },
        systemModules3: {
          jobApplicationForms: { reply: false, view: true, delete: false },
          contactMessages: { reply: false, view: true, delete: false },
        },
        maintenance: {
          rolesAndPermissions: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
          userMaintain: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
        },
      },
      status: true,
      permission: {
        canCreate: true,
        canView: true,
        canEdit: true,
        canDelete: false,
        canReply: false,
      },
      createdAt: "2024-02-15T10:45:00Z",
      updatedAt: "2024-03-05T11:20:00Z",
    },
    {
      id: 3,
      role: "Viewer",
      systemModules: {
        systemModules1: {
          homePage: { edit: false, view: true },
          aboutUs: { edit: false, view: false },
        },
        systemModules2: {
          milestones: { create: false, edit: false, view: true, delete: false },
          banners: { create: false, edit: false, view: true, delete: false },
          blogs: { create: false, edit: false, view: true, delete: false },
          careers: { create: false, edit: false, view: true, delete: false },
        },
        systemModules3: {
          jobApplicationForms: { reply: false, view: true, delete: false },
          contactMessages: { reply: false, view: true, delete: false },
        },
        maintenance: {
          rolesAndPermissions: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
          userMaintain: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
        },
      },
      status: true,
      permission: {
        canCreate: false,
        canView: true,
        canEdit: false,
        canDelete: false,
        canReply: false,
      },
      createdAt: "2024-01-20T09:30:00Z",
      updatedAt: "2024-02-28T08:10:00Z",
    },
    {
      id: 4,
      role: "Moderator",
      systemModules: {
        systemModules1: {
          homePage: { edit: false, view: true },
          aboutUs: { edit: false, view: true },
        },
        systemModules2: {
          milestones: { create: false, edit: false, view: true, delete: true },
          banners: { create: false, edit: false, view: true, delete: true },
          blogs: { create: false, edit: false, view: true, delete: true },
          careers: { create: false, edit: false, view: true, delete: true },
        },
        systemModules3: {
          jobApplicationForms: { reply: true, view: true, delete: false },
          contactMessages: { reply: true, view: true, delete: false },
        },
        maintenance: {
          rolesAndPermissions: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
          userMaintain: {
            create: false,
            edit: false,
            view: false,
            delete: false,
          },
        },
      },
      status: false,
      permission: {
        canCreate: false,
        canView: true,
        canEdit: false,
        canDelete: true,
        canReply: true,
      },
      createdAt: "2024-02-10T14:15:00Z",
      updatedAt: "2024-03-01T16:45:00Z",
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
      title="Roles & Permissions"
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.roleAndPermission.create.getHref());
          }}
        >
          Create New Role
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
            <RoleDialog
              roleDetail={selectedDetail}
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
