/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { formatDate } from "@/lib/format";
import { HiringPost } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEye } from "react-icons/tb";
import { NavLink } from "react-router";

export const getColumns = (
  onViewClick: (detail: HiringPost) => void,
  onViewDelete: (detail: HiringPost) => void
): ColumnDef<HiringPost>[] => {
  return [
    {
      accessorKey: "jobID",
      header: "Job Id",
    },
    {
      accessorKey: "region.image", // This doesn't work directly, so use cell rendering
      header: () => <div className="text-left">Image</div>,
      cell: ({ row }) => {
        const region = row.original.region; // Get the region object
        const image = region?.image; // Extract the image URL

        return (
          <div className="px-4 py-3 w-[84px]">
            {image ? (
              <img
                className="w-[36px] h-[24px] object-cover"
                src={image}
                alt="Region Image"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "position",
      header: () => <div className="text-left">Position Name</div>,
    },

    {
      accessorKey: "location.name",
      header: () => <div className="text-left">Location</div>,
    },
    {
      accessorKey: "jobType.name",
      header: () => <div className="text-left">JobType</div>,
    },

    {
      accessorKey: "jobClose",
      header: () => <div className="text-left">Close Date</div>,
      cell(props) {
        const createdate = props.row.getValue("jobClose") as string;
        return <div>{formatDate(createdate)}</div>;
      },
    },

    {
      accessorKey: "status",
      header: () => {
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
          <NavLink to={paths.app.career.hiringPost.edit.getHref(id)}>
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
