/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { FiEdit } from "react-icons/fi";
import { TbEye } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { paths } from "@/config/paths";
import { Milestone } from "@/types/api";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  onViewClick: (detail: Milestone) => void,
  onViewDelete: (detail: Milestone) => void
): ColumnDef<Milestone>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },

    {
      accessorKey: "icon",
      header: () => <div className="text-left">Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("icon") as string;

        return (
          <div className="px-4 py-3 w-[74px] h-[72px]">
            <img
              className="w-[36px] h-[36px] rounded-full object-cover"
              src={image}
              alt="image"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "colorCode",
      header: () => <div className="text-left">Color Code</div>,
    },
    {
      accessorKey: "image",
      header: () => <div className="text-left">Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("image") as string;

        return (
          <div className="px-4 py-3 w-[77px] h-[72px]">
            <img
              className="w-[46px] h-[56px] object-cover"
              src={image}
              alt="image"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: () => <div className="text-left">Title</div>,
    },
    {
      accessorKey: "description",
      header: () => <div className="pl-4"> Description</div>,
      cell: ({ row }) => {
        return (
          <div className="px-4 py-3 w-[152px] h-[70px] text-wrap overflow-y-hidden">
            <p className="">{row.getValue("description")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "link",
      header: () => <div className="pl-4">Website Link</div>,
      cell: ({ row }) => {
        return (
          <div className="px-4 py-3 w-[152px]  text-wrap overflow-y-hidden underline text-primaryText ">
            <p className="">{row.getValue("link")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ table }) => {
        // Get all rows
        const totalCount = 2;
        // Count rows with a specific status (e.g., "Completed" or truthy value)
        const matchedCount = table
          .getPrePaginationRowModel()
          .rows.filter((row) => row.getValue("status")).length; // Adjust condition as needed

        return (
          <div className="text-left">
            Status ({matchedCount}/{totalCount})
          </div>
        );
      },
      cell(props) {
        return (
          <div>
            {props.row.getValue("status") ? (
              <div className="text-statusActive p-2 w-20 rounded-lg text-center border-2 border-statusActive bg-bgStatusActive">
                active
              </div>
            ) : (
              <div className="text-primaryText p-2 w-20 rounded-lg text-center border-2 border-primaryText bg-bgStatusUnactive">
                Unactive
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
        const id = row.original.id; // Assuming id name exists in the row data

        return (
          <NavLink to={`${paths.app.banner.edit.getHref(id)}`}>
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
        const id = row.original.id; // Assuming id name exists in the row data

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
