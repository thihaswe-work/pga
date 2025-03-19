import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { Home } from "@/types/api";
import { FiEdit } from "react-icons/fi";

interface Prop {
  homeDetail: Home | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function HomeDialog({ homeDetail, open, setOpen }: Prop) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg rounded-xl p-6"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="hidden text-center text-lg font-semibold">
            home Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-sm">
          {/* ID */}
          <div className="flex justify-between items-center">
            <span className="text-secondaryText flex-1">ID</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{homeDetail?.id}</span>
          </div>

          {/* Section */}
          <div className="flex justify-between items-center">
            <span className="text-secondaryText flex-1">Section</span>
            <span className="mx-5">:</span>
            <span className="font-semibold flex-2">
              {homeDetail?.sectionType}
            </span>
          </div>

          {/* Image */}
          {homeDetail?.image && (
            <div className="flex justify-between items-center">
              <span className="text-secondaryText flex-1">Image</span>
              <span className="mx-5">:</span>
              <img
                src={homeDetail.image}
                alt="Preview"
                className="w-32 h-16 rounded-md object-cover flex-2"
              />
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="text-secondaryText flex-1">Header</span>
            <span className="mx-5">:</span>
            <span className="font-semibold flex-2">{homeDetail?.header}</span>
          </div>

          {/* Label */}
          <div className="flex justify-between items-center">
            <span className="text-secondaryText flex-1">Label</span>
            <span className="mx-5">:</span>
            <span className="flex-2">{homeDetail?.label}</span>
          </div>

          {/* Description */}
          <div className="flex justify-between ">
            <span className="text-secondaryText flex-1">Description</span>
            <span className="mx-5">:</span>
            <p className=" flex-2">{homeDetail?.description}</p>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex-1">Status</span>
            <span className="mx-5">:</span>
            <span
              className={`font-medium flex-2 ${
                homeDetail?.status ? "text-statusActive" : "text-primaryText"
              }`}
            >
              {homeDetail?.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-primaryText hover:bg-red-500 text-white flex items-center justify-center gap-2"
            onClick={() => {
              if (homeDetail)
                navigate(paths.app.home.edit.getHref(homeDetail.sectionType));
            }}
          >
            <FiEdit className="w-4 h-4" /> Edit
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
