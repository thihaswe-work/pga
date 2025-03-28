import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { AboutUs } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";
import { TbEye } from "react-icons/tb";
import { NavLink } from "react-router";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  onViewClick: (payment: AboutUs) => void
): ColumnDef<AboutUs>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "sectionType",
      header: "Section",
    },
    {
      accessorKey: "image",
      header: () => <div className="text-left">Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("image") as string[];

        return (
          <div className="px-4 py-3 w-[213px]">
            <img
              className="w-[180px] h-[43px] object-cover"
              src={image && image[0]}
              alt="image"
            />
          </div>
        );
      },
    },
    { accessorKey: "header", header: "Header" },
    { accessorKey: "label", header: "Label" },
    {
      accessorKey: "description",
      header: () => <div className="pl-4"> Description</div>,
      cell: ({ row }) => {
        return (
          <div className="px-4 py-3 w-[213px] h-[70px] text-wrap overflow-y-hidden">
            <p className="">{row.getValue("description")}</p>
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
            variant="ghost"
            className=""
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
        const section = row.original.sectionType; // Assuming section name exists in the row data

        return (
          <NavLink to={paths.app.aboutus.edit.getHref(section)}>
            <Button
              className={" text-edit hover:text-edit active:text-edit"}
              variant="ghost"
            >
              <FiEdit /> <span> Edit</span>
            </Button>
          </NavLink>
        );
      },
    },
  ];
};
