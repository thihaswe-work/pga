import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Banner } from "./columns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";

interface Prop {
  bannerDetail: Banner | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function BannerDialog({ bannerDetail, open, setOpen }: Prop) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg rounded-xl p-6"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="hidden">Hidden Dialog Title</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">
          {/* ID */}
          <div className="flex justify-between items-center">
            <span className="text-secondaryText flex-1">ID</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{bannerDetail?.id}</span>
          </div>

          {/* Image */}
          {bannerDetail?.image && (
            <div className="flex justify-between items-center">
              <span className="text-secondaryText flex-1">Image</span>
              <span className="mx-5">:</span>
              <img
                src={bannerDetail.image}
                alt="Preview"
                className="w-32 h-16 rounded-md object-cover flex-2"
              />
            </div>
          )}

          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex-1">Status</span>
            <span className="mx-5">:</span>
            <span className={`font-medium flex-2 text-statusActive`}>
              Active
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-primaryText hover:bg-red-500 text-white flex items-center justify-center gap-2"
            onClick={() =>
              navigate(paths.app.banner.edit.getHref(bannerDetail?.id))
            }
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

export function DeleteDialog({ open, setOpen, bannerDetail }: Prop) {
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
            className="bg-primaryText hover:bg- text-white flex items-center justify-center gap-2"
            onClick={() => console.log(bannerDetail)}
          >
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
