/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { paths } from "@/config/paths";
import { AboutUs } from "@/types/api";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUpdateAboutUs } from "../api/update-aboutUs";

interface Prop {
  data: AboutUs;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();

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

  const updateAboutUsMutation = useUpdateAboutUs({
    mutationConfig: {
      onSuccess: () => {
        console.log("Update successful!");
        navigate(paths.app.aboutus.root.getHref()); // Navigate after success
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    },
  });

  // Form Submission with Mutation
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
    updateAboutUsMutation.mutate({
      data: {
        header: formData.header,
        label: formData.label,
        sectionType: formData.sectionType,
        description: formData.description,
        status: formData.status,
        image: formData.image,
      },
      AboutUsSection: data.sectionType, // Ensure this value is correct
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
            onClick={() => navigate(paths.app.aboutus.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
