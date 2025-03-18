/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { FiEdit } from "react-icons/fi";
import { TbEye } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Banner = {
  id: number;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export const getColumns = (
  onViewClick: (payment: Banner) => void
): ColumnDef<Banner>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },

    {
      accessorKey: "image",
      header: () => <div className="text-left">Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("image") as string;

        return (
          <div className="px-4 py-3 w-[213px]">
            <img
              className="w-[180px] h-[43px] object-cover"
              src={image}
              alt="image"
            />
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
          <NavLink to={`/app/banner/${id}/edit`}>
            <Button variant="ghost" className={"cursor-pointer text-edit"}>
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
            className={
              "cursor-pointer text-delete hover:text-delete active:text-delete"
            }
          >
            <RiDeleteBin6Line />
            <span>Delete</span>
          </Button>
        );
      },
    },
  ];
};
