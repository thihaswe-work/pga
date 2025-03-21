import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import { Blog, BlogCategory } from "@/types/api";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { FaListUl } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";
interface Prop {
  data: Blog;
  categories: BlogCategory[];
}

export default function EditForm({ data, categories }: Prop) {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.image || null
  );

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      category: data.categoryId || "",
      title: data.title || "",
      description: data.description || "",
      status: data?.status || false,
      image: null,
      imagePreview: data.image || null,
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
      setValue("imagePreview", URL.createObjectURL(file));
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
        setValue("imagePreview", URL.createObjectURL(file));
      }
    },
    []
  );

  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Form Data:", formData);
  };

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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <span>
                      {categories.find(
                        (category) => category.id === Number(field.value)
                      )?.name || "Select a category"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories.map((category) => (
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
        <div className="space-y-2">
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
        </div>
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
                            setValue("imagePreview", null);
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

import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useForm, Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export function TiptapEditor() {
  const { control, handleSubmit, setValue, getValues, formState } = useForm({
    defaultValues: { description: "" },
  });

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, BulletList, OrderedList, ListItem],
    content: "",
    onUpdate: ({ editor }) => {
      // Update form field value when editor content changes
      setValue("description", editor.getHTML(), { shouldValidate: true });
    },
  });

  const onSubmit = (data: { description: string }) => {
    console.log("Submitted Data:", data);
  };

  // Function to preserve spaces and line breaks in the output content
  const formatOutputContent = (html: string) => {
    return html.replace(/<p><\/p>/g, "<p>&nbsp;</p>"); // Replace empty paragraphs with a non-breaking space (or use <br />)
  };
  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="font-medium text-gray-700">Description *</Label>

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
            {formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Display the HTML content of description under the editor */}
          {/* <div className="mt-4">
            <h3 className="text-lg font-medium">Input Value:</h3>
            <div
              className="p-2 mt-2 text-active"
              style={{
                whiteSpace: "pre-wrap", // Preserve spaces and line breaks
                wordBreak: "break-word", // Prevent long words from overflowing
                minHeight: "100px", // Ensure the div has a defined height
              }}
              dangerouslySetInnerHTML={{
                __html:
                  formatOutputContent(getValues("description")) || "notext",
              }}
            />
          </div> */}

          <Button type="submit" className="w-full bg-blue-600 text-white">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// export function Tpp() {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     // Simulating an API call
//     const apiData = `
//       <p>hello world. safasfas    sfsafasfa  sfsafasfa  …  sfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfasfsafasfa                                     sfsdkaf</p>`;
//     setContent(apiData);
//   }, []);

//   return (
//     <div>
//       <div
//         className="p-2 mt-2 "
//         style={{
//           whiteSpace: "pre-wrap", // Preserve spaces and line breaks
//           wordBreak: "break-word", // Prevent long words from overflowing
//           minHeight: "100px", // Ensure the div has a defined height
//         }}
//         dangerouslySetInnerHTML={{ __html: content }}
//       />
//     </div>
//   );
// }
