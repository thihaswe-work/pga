/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { Home } from "@/types/api";
import { useUpdateHome } from "../api/update-home";

interface Prop {
  data: Home;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.image || null
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      header: data.header || "",
      label: data.label || "",
      sectionType: data.sectionType || "",
      description: data.description || "",
      status: data?.status || false,
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
      onChange(file);
      setImagePreview(URL.createObjectURL(file));
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
  const updateHomeMutation = useUpdateHome({
    mutationConfig: {
      onSuccess: () => {
        console.log("Update successful!");
        navigate(paths.app.home.root.getHref()); // Navigate after success
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    },
  });

  // Form Submission with Mutation
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
    updateHomeMutation.mutate({
      data: {
        header: formData.header,
        label: formData.label,
        sectionType: formData.sectionType,
        description: formData.description,
        status: formData.status,
        image: formData.image,
      },
      homeSection: data.sectionType, // Ensure this value is correct
    });
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
            name="header"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
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
            onClick={() => navigate(paths.app.home.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
