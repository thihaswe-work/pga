/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { paths } from "@/config/paths";
import { BlogCategory } from "@/types/api";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUpdateBlogCategory } from "../api/update-blogCategory";
interface Prop {
  data: BlogCategory;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: data?.status || false,
      name: data?.name || "",
    },
  });
  const updateBlogCategoryMutation = useUpdateBlogCategory({
    mutationConfig: {
      onSuccess: () => {
        console.log("Update successful!");
        navigate(paths.app.blog.categories.root.getHref()); // Navigate after success
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    },
  });
  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
    updateBlogCategoryMutation.mutate({
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
            onClick={() => navigate(paths.app.blog.categories.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
