/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { FiEdit } from "react-icons/fi";
import { TbEye } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { paths } from "@/config/paths";
import { Blog, BlogCategory, CareerCategory } from "@/types/api";
import { formatDate } from "@/lib/format";

export const getColumns = (
  onViewClick: (detail: CareerCategory) => void,
  onViewDelete: (detail: CareerCategory) => void
): ColumnDef<CareerCategory>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
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
        return <div className="text-left">Status</div>;
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
          <NavLink to={paths.app.career.categories.edit.getHref(id)}>
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
