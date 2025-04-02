/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { RoleAndPermission } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEye } from "react-icons/tb";
import { NavLink } from "react-router";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  onViewClick: (detail: RoleAndPermission) => void,
  onViewDelete: (detail: RoleAndPermission) => void
): ColumnDef<RoleAndPermission>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },

    {
      accessorKey: "role",
      header: () => <div className="text-left">Role</div>,
    },

    {
      accessorKey: "systemModules",
      header: () => <div className="text-left">System Modules</div>,
      cell: ({ row }) => {
        const systemModules = row.original.systemModules;

        // Extract and filter modules where at least one permission is `true`
        const getActivePages = (modules: any) => {
          return Object.entries(modules)
            .flatMap(
              (
                [_, pages] // Iterate through systemModules1, systemModules2, etc.
              ) =>
                Object.entries(pages).map(([pageName, permissions]) =>
                  Object.values(permissions).some(Boolean) ? pageName : null
                )
            )
            .filter(Boolean);
        };

        const activePages = getActivePages(systemModules);

        return (
          <div className="px-4 py-3 w-[298px] flex flex-wrap gap-2">
            {activePages.length > 0 ? (
              activePages.map((page, index) => (
                <div
                  key={index}
                  className="bg-bgStatusUnactive text-primaryText px-2 py-1 rounded"
                >
                  {page}
                </div>
              ))
            ) : (
              <div className="bg-bgStatusUnactive text-red-700 px-2 py-1 rounded">
                No Access
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "permission",
      header: () => <div className="pl-4">Permission</div>,
      cell: ({ row }) => {
        const permissions = row.original.permission;

        // Extract keys where at least one permission is true
        const activePermissions = Object.entries(permissions)
          .filter(([_, value]) => value) // Keep only true values
          .map(([key]) => key); // Get the key names

        return (
          <div className="px-4 py-3 w-[236px] flex flex-wrap gap-2">
            {activePermissions.length > 0 ? (
              activePermissions.map((permission, index) => (
                <div
                  key={index}
                  className={`${
                    permission === "canCreate"
                      ? "bg-bgStatusActive text-statusActive"
                      : ""
                  }
                  
                  ${
                    permission === "canEdit"
                      ? "bg-[#D9770633]  text-[#D97706]"
                      : ""
                  }


                  ${
                    permission === "canView"
                      ? "bg-[#99999933] text-[#999999]"
                      : ""
                  }
                  ${
                    permission === "canDelete"
                      ? "bg-bgStatusActive text-statusActive"
                      : ""
                  }
                  ${
                    permission === "canReply"
                      ? "bg-[#2563EB33] text-[#2563EB]"
                      : ""
                  } px-2 py-1 rounded`}
                >
                  {permission}
                </div>
              ))
            ) : (
              <div className="bg-red-500 text-white px-2 py-1 rounded">
                No Permission
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell(props) {
        return (
          <div>
            {props.row.getValue("status") ? (
              <div className="text-statusActive p-2 w-20 rounded-lg text-center border-2 border-statusActive bg-bgStatusActive">
                active
              </div>
            ) : (
              <div className="text-primaryText p-2 w-20 rounded-lg text-center border-2 border-primaryText bg-bgStatusUnactive">
                Inactive
              </div>
            )}
          </div>
        );
      },
    },

    {
      id: "view",
      cell: ({ row }) => {
        return (
          <Button
            className="flex items-center"
            variant="ghost"
            onClick={() => onViewClick(row.original)} // Pass row data to the parent
          >
            <TbEye className="text-secondaryText" />
            <span className=""> View</span>
          </Button>
        );
      },
    },

    {
      id: "edit",
      cell: ({ row }) => {
        const id = row.original.id;

        // Hide edit button if id is 1
        if (id === 1) return null;

        return (
          <NavLink to={`${paths.app.roleAndPermission.edit.getHref(id)}`}>
            <Button
              variant="ghost"
              className={" text-edit hover:text-edit active:text-edit"}
            >
              <FiEdit /> <span> Edit</span>
            </Button>
          </NavLink>
        );
      },
    },

    {
      id: "delete",
      cell: ({ row }) => {
        const id = row.original.id;

        // Hide delete button if id is 1
        if (id === 1) return null;

        return (
          <Button
            variant="ghost"
            className={" text-delete hover:text-delete active:text-delete"}
            onClick={() => onViewDelete(row.original)}
          >
            <RiDeleteBin6Line />
            <span>Delete</span>
          </Button>
        );
      },
    },
  ];
};
