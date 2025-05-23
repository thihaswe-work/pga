/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateMilestone } from "../api/create-milestone";

export default function CreateForm() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [draggingIcon, setDraggingIcon] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  // const { data, isLoading, isError } = useMilestones({});
  // if (isLoading) return <Loading />;
  // if (isError)
  //   return <p className="text-red-500">Failed to fetch Milestones.</p>;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: false,
      image: null,
      icon: null,
      title: "",
      description: "",
      link: "",
      timeline: 0,
      colorCode: "",
    },
  });
  console.log("image", imagePreview, "icon", iconPreview);
  const handleIconUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      onChange(file);
      setIconPreview(URL.createObjectURL(file)); // Ensure icon preview is updated
    }
  };

  const handleDragEnterIcon = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDraggingIcon(true);
  }, []);

  const handleDragOverIcon = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDraggingIcon(true);
  }, []);

  const handleDragLeaveIcon = useCallback(() => {
    setDraggingIcon(false);
  }, []);

  const handleDropIcon = useCallback(
    (event: React.DragEvent, onChange: (file: File | null) => void) => {
      event.preventDefault();
      setDraggingIcon(false);

      if (event.dataTransfer.files.length) {
        const file = event.dataTransfer.files[0];
        onChange(file);
        setIconPreview(URL.createObjectURL(file)); // Ensure iconPreview is updated correctly
      }
    },
    []
  );

  // Drag and Drop Handlers
  // Handle File Selection
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      onChange(file); // Update form state
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };
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

  const createMilestoneMutation = useCreateMilestone({
    mutationConfig: {
      onSuccess: () => {
        toast("Milestone Created");
        console.log("create successful!");
        navigate(paths.app.milestone.root.getHref()); // Navigate after success
      },
      onError: (error: any) => {
        console.error("create failed:", error);
      },
    },
  });
  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
    createMilestoneMutation.mutate({
      data: {
        status: formData.status,
        image: formData.image,
        icon: formData.icon,
        link: formData.link,
        timeline: formData.timeline,
        description: formData.description,
        colorCode: formData.colorCode,
        title: formData.title,
      },
      // Ensure this value is correct
    });
  };

  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
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
        <div className="space-y-2">
          <Label className="font-medium">
            Website Links<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label className="font-medium">
            Color Code<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="colorCode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label className="font-medium">
            Founded<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
        </div>
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

        {/*Icon Upload */}
        <Card className="p-0 bg-secondaryBackground gap-0">
          <CardHeader>
            <Label className="font-medium w-full p-6 text-lg">Icon</Label>
          </CardHeader>
          <CardContent className="bg-background p-6">
            <Controller
              name="icon"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  {/* Drag & Drop Box */}
                  <div
                    className={`border-2 ${
                      draggingIcon
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    } 
                  border-dashed rounded-lg p-6 text-center transition-all bg-secondaryBackground`}
                    onDragEnter={handleDragEnterIcon}
                    onDragOver={handleDragOverIcon}
                    onDragLeave={handleDragLeaveIcon}
                    onDrop={(event) => handleDropIcon(event, onChange)}
                  >
                    <input
                      type="file"
                      className="hidden"
                      id="iconUpload" // Ensure this is different from the image input
                      accept="image/*"
                      onChange={(event) => handleIconUpload(event, onChange)} // Ensure this is calling the correct function
                    />
                    <label
                      htmlFor="iconUpload" // Use correct label reference
                      className="cursor-pointer text-secondaryText hover:underline"
                    >
                      {draggingIcon
                        ? "Drop your file here"
                        : "Drag & Drop your files or "}
                      <span className="text-red-500">Browse</span>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {iconPreview && (
                    <div className="mt-4 flex flex-col gap-4 bg-black text-white p-2 rounded-md pb-10">
                      <div>
                        <Button
                          size="sm"
                          onClick={() => {
                            onChange(null);
                            setIconPreview(null);
                          }}
                        >
                          X
                        </Button>
                      </div>
                      <img
                        src={iconPreview}
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
                  onCheckedChange={field.onChange}
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
            onClick={() => navigate(paths.app.milestone.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
