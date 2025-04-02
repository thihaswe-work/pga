/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import { RoleAndPermission, UserMaintain } from "@/types/api";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";

import "@/index.css";
import { useState } from "react";

interface Prop {
  userDetail: UserMaintain | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  roles: RoleAndPermission[];
  navlink: string;
  deleteFunc?: (para?: any) => void;
}

export function UserDialog({
  userDetail,
  open,
  setOpen,
  roles,
  navlink,
}: Prop) {
  const navigate = useNavigate();
  const userRole = roles.find(
    (item) => item.id === (userDetail?.roleId as number)
  );

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`rounded-xl p-6  overflow-y-auto  `}>
        <DialogHeader>
          <DialogTitle className="hidden">User Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          {/* ID */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">ID</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{userDetail?.id}</span>
          </div>
          {/* User Name */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">User Name</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{userDetail?.username}</span>
          </div>
          {/* Login Email */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">Login Email</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{userDetail?.email}</span>
          </div>
          {/* Password */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex-1">Password</span>
            <span className="mx-5">:</span>
            <div className="flex-2 flex items-center">
              <span className="font-medium w-full flex justify-between">
                {showPassword ? userDetail?.password : "******"}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </span>
            </div>
          </div>
          {/* Categories */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">Role</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">
              {userRole ? userRole.role : "unknown"}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex-1">Status</span>
            <span className="mx-5">:</span>
            <span
              className={`font-medium flex-2 ${
                userDetail?.status ? "text-statusActive" : "text-primaryText"
              }`}
            >
              {userDetail?.status ? "Active" : "Inactive"}
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

export function DeleteDialog({ open, setOpen, userDetail, deleteFunc }: Prop) {
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
