import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { paths } from "@/config/paths";
import { BlogCategory } from "@/types/api";
import { Pencil } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";

interface Prop {
  blogCategoryDetail: BlogCategory | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function BlogCategoryDialog({
  blogCategoryDetail,
  open,
  setOpen,
}: Prop) {
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
            <span className="font-medium flex-2">{blogCategoryDetail?.id}</span>
          </div>

          {/* Image */}
          {blogCategoryDetail?.image && (
            <div className="flex justify-between items-center">
              <span className="text-secondaryText flex-1">Image</span>
              <span className="mx-5">:</span>
              <img
                src={blogCategoryDetail?.image}
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
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            onClick={() => {
              navigate(
                paths.app.blog.categories.edit.getHref(blogCategoryDetail?.id)
              );
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

export function DeleteDialog({ open, setOpen, blogCategoryDetail }: Prop) {
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
            className="bg-primaryText hover:bg-red-700 text-white flex items-center justify-center gap-2"
            onClick={() => console.log(blogCategoryDetail?.id)}
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
