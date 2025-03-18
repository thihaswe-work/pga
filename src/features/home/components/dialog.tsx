import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home } from "./columns";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";

interface Prop {
  homeDetail: Home | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function HomeDialog({ homeDetail, open, setOpen }: Prop) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded-xl p-6">
        <DialogHeader>
          {/* <DialogTitle className="text-center text-lg font-semibold">
           home Details
          </DialogTitle> */}
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
            <span className={`font-medium flex-2 text-statusActive`}>
              Active
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            onClick={() => {
              if (homeDetail)
                navigate(paths.app.homeEdit.getHref(homeDetail.sectionType));
            }}
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
