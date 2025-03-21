import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import { Pencil } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";

import "@/index.css";

interface Prop<T> {
  detail: T; // detail is of type T or null
  open: boolean; // dialog open state
  setOpen: (open: boolean) => void; // function to set open state
  // categories is optional (C is optional)
  uploadedDate?: string; // uploadedDate is optional
  navlink: string; // navigation link
}

export function OpenDialog<T>({
  detail,
  open,
  setOpen,

  uploadedDate,
  navlink,
}: Prop<T>) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`rounded-xl p-6  overflow-y-auto  `}>
        <DialogHeader>
          <DialogTitle className="hidden">Blog Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          {/* ID */}
          <div className="space-y-2">
            {Object.entries(detail || {})
              .filter(
                ([key, value]) =>
                  value != null &&
                  key !== "createdAt" &&
                  key !== "updatedAt" &&
                  key !== "image"
              ) // Filter out null, undefined, and 'createdAt', 'updatedAt'
              .map(([key, value]) => {
                // Capitalize the first letter of the key
                const capitalizedKey =
                  key.charAt(0).toUpperCase() + key.slice(1);

                let displayValue = String(value); // Default to the value as string
                let textColor = ""; // Default text color

                // Check if the key is 'status' and set display text and color
                if (key === "status") {
                  displayValue = value ? "Active" : "Inactive";
                  textColor = value ? "text-statusActive" : "text-primaryText"; // Green for true, Red for false
                }

                return (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-500 flex-1">
                      {capitalizedKey}
                    </span>
                    <span className="mx-5">:</span>
                    <span className={`font-medium flex-2 ${textColor}`}>
                      {displayValue}
                    </span>
                  </div>
                );
              })}
          </div>

          {/* Image */}
          {detail?.image && (
            <div className="flex justify-between items-center">
              <span className="text-secondaryText flex-1">Image</span>
              <span className="mx-5">:</span>
              <img
                src={detail.image}
                alt="Preview"
                className="w-32 h-16 rounded-md object-cover flex-2"
              />
            </div>
          )}

          {/* Uploaded Date */}
          {uploadedDate && (
            <div className="flex">
              <span className="text-gray-500 flex-1">Uploaded Date</span>
              <span className="mx-5">:</span>
              <span className="font-medium flex-2">
                {formatDate(uploadedDate)}
              </span>
            </div>
          )}
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

interface DeleteProp<T> {
  open: boolean;
  setOpen: (para: boolean) => void;
  detail: T;
}

export function DeleteDialog<T>({ open, setOpen, detail }: DeleteProp<T>) {
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
            onClick={() => console.log(detail?.id)}
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
