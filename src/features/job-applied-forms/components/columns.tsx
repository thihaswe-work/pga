/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { FiEdit } from "react-icons/fi";
import { TbEye } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { paths } from "@/config/paths";
import { Banner, ContactMessage, JobApplyForm } from "@/types/api";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  onViewClick: (detail: JobApplyForm) => void,
  onViewDelete: (detail: JobApplyForm) => void
): ColumnDef<JobApplyForm>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "email",
      header: "Email",
    },
    { accessorKey: "applyDate", header: "Apply Date" },
    {
      accessorKey: "coverLetter",
      header: () => <div className="text-left">Cover Letter</div>,
      cell: ({ row }) => (
        <div className="overflow-hidden w-32 h-[58px] text-ellipsis text-wrap">
          {row.getValue("coverLetter")}
        </div>
      ),
    },
    {
      accessorKey: "resume",
      header: () => <div className="text-left">Resume</div>,
      cell: ({ row }) => (
        <div className="overflow-hidden w-32 h-[58px] text-ellipsis text-wrap">
          {row.getValue("resume")}
        </div>
      ),
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
