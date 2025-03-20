import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
interface Prop {
  data: any;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      title: data?.title || "",
      label: data?.label || "",
      description: data?.description || "",
      availabilityStatus: data?.availabilityStatus === "In Stock" || false,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview URL
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

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files.length) {
      const file = event.dataTransfer.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  useEffect(() => {
    if (data) {
      setIsActive(data?.availabilityStatus === "In Stock");
      setImagePreview(data?.thumbnail || null);
    }
  }, [data]);

  const onSubmit = (data: any) => {
    if (image) {
      console.log(image);
    }
    console.log("Form Submitted with:", data, imagePreview);
  };

  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        {/* Header */}
        <div className="space-y-2">
          <Label className="font-medium">
            Header<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
          <p className="text-sm text-muted-foreground">
            Minimum 60, Maximum 100
          </p>
        </div>

        {/* Label */}
        <div className="space-y-2">
          <Label className="font-medium">
            Label<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="label"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="IN HOUSE STAFFS"
                className="mt-1"
              />
            )}
          />
          <p className="text-sm text-muted-foreground">
            Minimum 60, Maximum 100
          </p>
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
          <p className="text-sm text-muted-foreground">
            Minimum 100, Maximum 250
          </p>
        </div>

        {/* Image Upload */}
        <Card className=" p-0 bg-secondaryBackground gap-0">
          <CardHeader>
            <Label className="font-medium w-full p-6 text-lg ">Image</Label>
          </CardHeader>
          <CardContent className=" bg-background p-6">
            {/* Drag & Drop Box */}
            <div
              className={`border-2 ${
                dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } border-dashed rounded-lg p-6 text-center transition-all bg-secondaryBackground`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={handleImageUpload}
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

            {/* File Preview with Image */}
            {imagePreview && (
              <div className="mt-4 flex flex-col gap-4 bg-black text-white p-2 rounded-md pb-10">
                <div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    X
                  </Button>
                  {image && (
                    <span className="text-sm">
                      {image.name} ({(image.size / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>

                <img
                  src={imagePreview!}
                  alt="Preview"
                  className="w-[368px] h-[86px] rounded-md object-cover mx-auto"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="w-full max-w-[436px] space-y-6 ">
        {/* Active Toggle */}
        <div className="flex justify-between border flex-col rounded-lg bg-background">
          <Label className="font-medium px-6 py-4">Active</Label>
          <div className="h-[1px] w-full bg-[#e9e9ea]"></div>
          <div className="p-6">
            <Controller
              name="availabilityStatus"
              control={control}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={"data-[state=checked]:bg-switchCheck"}
                />
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 ">
          <Button
            variant="default"
            className="bg-primaryText hover:bg-text-500"
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigate(paths.app.home.root.getHref());
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
