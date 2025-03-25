import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import { Blog, BlogCategory } from "@/types/api";
import { Pencil } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import "@/index.css";

interface Prop {
  blogDetail: Blog | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: BlogCategory[];
}

export function OpenDialog({ blogDetail, open, setOpen, categories }: Prop) {
  const navigate = useNavigate();
  const category = categories.find(
    (item) => item.id === blogDetail?.blogCategoryId
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`rounded-xl p-6  overflow-y-auto max-h-[80vh] customdialog sm:max-w-[70vw] `}
      >
        <DialogHeader>
          <DialogTitle className="hidden">Blog Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          {/* ID */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">ID</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{blogDetail?.id}</span>
          </div>
          {/* Categories */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">Categories</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">
              {category ? category.name : "unknown"}
            </span>
          </div>
          {/* Title */}
          <div className="flex justify-between">
            <span className="text-gray-500 flex-1">Title</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">{blogDetail?.title}</span>
          </div>
          {/* Description */}
          <div className="flex">
            <span className="text-gray-500 flex-1">Description</span>
            <span className="mx-5">:</span>
            <p className=" text-justify flex-2">{blogDetail?.description}</p>
          </div>
          {/* Image */}
          {blogDetail?.image && (
            <div className="flex justify-between items-center">
              <span className="text-secondaryText flex-1">Image</span>
              <span className="mx-5">:</span>
              <img
                src={blogDetail.image}
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

          {/* Uploaded Date */}
          <div className="flex">
            <span className="text-gray-500 flex-1">Uploaded Date</span>
            <span className="mx-5">:</span>
            <span className="font-medium flex-2">
              {formatDate(blogDetail?.createdAt as string)}
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
            onClick={() => navigate(`/edit/${blogDetail?.id}`)}
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

export function DeleteDialog({ open, setOpen, blogDetail }: Prop) {
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
            onClick={() => console.log(blogDetail?.id)}
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
