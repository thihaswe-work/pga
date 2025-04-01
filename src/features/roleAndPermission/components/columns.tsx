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
        return (
          <div className="px-4 py-3 w-[77px] h-[72px]">System Modules</div>
        );
      },
    },

    {
      accessorKey: "permission",
      header: () => <div className="pl-4"> Permission</div>,
      cell: ({ row }) => {
        return (
          <div className="px-4 py-3 w-[152px] h-[70px] text-wrap overflow-y-hidden">
            Permission
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
