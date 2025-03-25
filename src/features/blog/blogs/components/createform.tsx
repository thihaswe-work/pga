/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { paths } from "@/config/paths";
import { BlogCategory } from "@/types/api";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaListOl, FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useBlogCategories } from "../../categories/api/get-blogCategories";
import { useCreateBlog } from "../api/create-blog";

export default function CreateForm() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: categories } = useBlogCategories({});
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      category: "",
      title: "",
      description: "",
      status: false,
      image: null,
    },
  });
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, BulletList, OrderedList, ListItem],
    content: "",
    onUpdate: ({ editor }) => {
      // Update form field value when editor content changes
      setValue("description", editor.getHTML(), { shouldValidate: true });
    },
  });

  // Handle File Selection
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      console.log(file);
      onChange(file); // Update form state
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Drag and Drop Handlers
  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent, onChange: (file: File | null) => void) => {
      event.preventDefault();
      setDragging(false);

      if (event.dataTransfer.files.length) {
        const file = event.dataTransfer.files[0];
        onChange(file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    []
  );
  const createBlogMutation = useCreateBlog({
    mutationConfig: {
      onSuccess: () => {
        console.log("Update successful!");
        navigate(paths.app.blog.blogs.root.getHref()); // Navigate after success
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    },
  });

  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Form Data:", formData);
    createBlogMutation.mutate({
      data: {
        status: formData.status,
        image: formData.image,
        title: formData.title,
        description: formData.description,
        blogCategoryId: formData.category,
      },
      // Ensure this value is correct
    });
  };
  if (!categories) return <p>no caegories</p>;
  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        {/* Category Select */}
        <div className="space-y-2 ">
          <Label className="font-medium">
            Category<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {categories?.data.find(
                        (category: BlogCategory) =>
                          category.id === Number(field.value)
                      )?.name || "Select a category"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories?.data.map((category: BlogCategory) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
                        className="w-full"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <Label className="font-medium">
            Title<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
        </div>
        {/* Description */}
        <div>
          <Label className="font-medium ">
            Description <span className="text-primaryText">*</span>
          </Label>
          {/* Toolbar */}
          <div className="flex gap-2 border-b pb-2 mb-2">
            {/* Bold */}
            <Button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-1 hover:bg-transparent ${
                editor?.isActive("bold")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <b>B</b>
            </Button>

            {/* Italic */}
            <Button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-1 hover:bg-transparent ${
                editor?.isActive("italic")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <i>I</i>
            </Button>

            {/* Bullet List */}
            <Button
              type="button"
              onClick={() => {
                if (editor?.isActive("orderedList")) {
                  editor.chain().focus().toggleOrderedList().run(); // Remove ordered list first
                }
                editor?.chain().focus().toggleBulletList().run(); // Then toggle bullet list
              }}
              className={`p-1 hover:bg-transparent ${
                editor?.isActive("bulletList")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <FaListUl />
            </Button>

            {/* Ordered List */}
            <Button
              type="button"
              onClick={() => {
                if (editor?.isActive("bulletList")) {
                  editor.chain().focus().toggleBulletList().run(); // Remove bullet list first
                }
                editor?.chain().focus().toggleOrderedList().run(); // Then toggle ordered list
              }}
              className={`p-1 hover:bg-transparent ${
                editor?.isActive("orderedList")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <FaListOl />
            </Button>
          </div>

          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <div className="mt-2 border rounded-lg p-2 bg-white min-h-[150px]">
                <EditorContent
                  editor={editor}
                  className="editor-content h-full" // Add a class for custom styling
                />
              </div>
            )}
          />
        </div>
        {/* <div className="space-y-2">
             <Label className="font-medium">
               Description<span className="text-primaryText">*</span>
             </Label>
             <Controller
               name="description"
               control={control}
               render={({ field }) => (
                 <Textarea
                   {...field}
                   placeholder="Enter description..."
                   className="mt-1"
                   rows={3}
                 />
               )}
             />
           </div> */}
        {/* Image Upload */}
        <Card className="p-0 bg-secondaryBackground gap-0">
          <CardHeader>
            <Label className="font-medium w-full p-6 text-lg">Image</Label>
          </CardHeader>
          <CardContent className="bg-background p-6">
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  {/* Drag & Drop Box */}
                  <div
                    className={`border-2 ${
                      dragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    } 
                       border-dashed rounded-lg p-6 text-center transition-all bg-secondaryBackground`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(event) => handleDrop(event, onChange)}
                  >
                    <input
                      type="file"
                      className="hidden"
                      id="fileUpload"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, onChange)}
                    />
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer text-secondaryText hover:underline"
                    >
                      {dragging
                        ? "Drop your file here"
                        : "Drag & Drop your files or "}
                      <span className="text-red-500">Browse</span>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4 flex flex-col gap-4 bg-black text-white p-2 rounded-md pb-10">
                      <div>
                        <Button
                          size="sm"
                          onClick={() => {
                            onChange(null);
                            setImagePreview(null);
                          }}
                        >
                          X
                        </Button>
                      </div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-[368px] h-[86px] rounded-md object-cover mx-auto"
                      />
                    </div>
                  )}
                </>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right Section */}
      <div className="w-full max-w-[436px] space-y-6">
        {/* Active Toggle */}
        <div className="flex justify-between border flex-col rounded-lg bg-background">
          <Label className="font-medium px-6 py-4">Active</Label>
          <div className="h-[1px] w-full bg-[#e9e9ea]"></div>
          <div className="p-6">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange} // This ensures it works with boolean values
                  className={"data-[state=checked]:bg-switchCheck"}
                />
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            className="bg-primaryText hover:bg-text-500"
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(paths.app.blog.blogs.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
