/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { paths } from "@/config/paths";
import { CareerCategory } from "@/types/api";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUpdateCareerCategory } from "../api/update-careerCategory";
import { useCallback, useState } from "react";
interface Prop {
  data: CareerCategory;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.image || null
  );
  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: data?.status || false,
      name: data?.name || "",
      image: data.image || null,
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
  const updateCareerCategoryMutation = useUpdateCareerCategory({
    mutationConfig: {
      onSuccess: () => {
        console.log("Update successful!");
        navigate(paths.app.career.categories.root.getHref()); // Navigate after success
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    },
  });
  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
    updateCareerCategoryMutation.mutate({
      data: {
        status: formData.status,
        name: formData.name,
      },
      id: data.id, // Ensure this value is correct
    });
  };
  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        <Label htmlFor="category" className="font-semibold">
          Categories Name <span className="text-red-500">*</span>
        </Label>
        <Card className="border border-gray-300 rounded-md">
          <CardContent className="p-2 px-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="category"
                  className="border-none focus:ring-0 bg-secondaryBackground"
                />
              )}
            />
          </CardContent>
        </Card>
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
      {/* Status Toggle */}
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
            onClick={() => navigate(paths.app.career.categories.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
