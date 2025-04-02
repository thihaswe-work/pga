/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleAndPermission } from "@/types/api";
import { Pencil } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";

import "@/index.css";

interface Prop {
  roleDetail: RoleAndPermission;
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteFunc?: (para?: any) => void;
  navlink: string;
}

export function RoleDialog({ roleDetail, open, setOpen, navlink }: Prop) {
  const navigate = useNavigate();
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

  const activePages = getActivePages(roleDetail?.systemModules);

  const permissions = roleDetail?.permission;

  const activePermissions = Object.entries(permissions)
    .filter(([_, value]) => value) // Keep only true values
    .map(([key]) => key); // Get the key names
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`rounded-xl p-6  overflow-y-auto  `}>
        <DialogHeader>
          <DialogTitle className="hidden">
            Roles & Permissions Details
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          {/* ID */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">ID</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{roleDetail?.id}</span>
          </div>

          {/* Title */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">Title</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{roleDetail?.role}</span>
          </div>
          {/* system modules */}
          <div className="flex">
            <span className="text-gray-500 flex-1">System Modules</span>
            <span className="mx-5">:</span>
            <p className=" text-justify flex-2 flex flex-wrap gap-2">
              {activePages.map((page, index) => (
                <div
                  key={index}
                  className="bg-bgStatusUnactive text-primaryText px-2 py-1 rounded w-fit"
                >
                  {page}
                </div>
              ))}
            </p>
          </div>

          {/* Permission */}
          <div className="flex">
            <span className="text-gray-500 flex-1">Permission</span>
            <span className="mx-5">:</span>
            <p className=" text-justify flex-2 flex flex-wrap gap-2">
              {activePermissions.map((permission, index) => (
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
              ))}
            </p>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex-1">Status</span>
            <span className="mx-5">:</span>
            <span
              className={`font-medium flex-2 ${
                roleDetail?.status ? "text-statusActive" : "text-primaryText"
              }`}
            >
              {roleDetail?.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
            onClick={() => navigate(navlink)}
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteDialog({ open, setOpen, roleDetail, deleteFunc }: Prop) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg rounded-xl p-6"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="hidden">Hidden Dialog Title</DialogTitle>
        </DialogHeader>
        <RiDeleteBin6Line className="w-28 h-36 text-primaryText mx-auto" />
        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <h3 className="text-primaryText text-2xl font-bold text-center">
            Are You Sure To Delete It?
          </h3>
          <Button
            className="bg-primaryText hover:bg-red-500 text-white flex items-center justify-center gap-2"
            onClick={() => deleteFunc && deleteFunc()}
          >
            <Pencil className="w-4 h-4" />
            Delete
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
