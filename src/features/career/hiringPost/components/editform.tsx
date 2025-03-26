/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
import { HiringPost } from "@/types/api";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Controller, useForm } from "react-hook-form";
import { FaListOl, FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCareerCategories } from "../../categories/api/get-careerCategories";
import { useRegions } from "../../regions/api/get-regions";
import { useRelatedFields } from "../../relatedFields/api/get-relatedFields";
import { useJobTypes } from "../api/get-jobTypes";
import { useLocations } from "../api/get-locations";
import { useUpdateHiringPost } from "../api/update-hiringPost";
import { Textarea } from "@/components/ui/textarea";
interface Prop {
  data: HiringPost;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();
  const { data: categories } = useCareerCategories({});
  const { data: regions } = useRegions({});
  const { data: locations } = useLocations({});
  const { data: jobtypes } = useJobTypes({});
  const { data: relatedFields } = useRelatedFields({});
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      category: data.categoryId || "",
      relatedField: data.relatedFieldId || "",
      region: data.regionId || "",
      status: data?.status || false,
      position: data?.position || "",
      location: data.locationId || "",
      jobType: data.jobTypeId || "",
      closeDate: data.jobClose || "",
      description: data?.description || "",
      requirement: data?.requirement || "",
      responsibility: data?.responsibility || "",
      benefit: data?.benefit || "",
    },
  });
  const require = useEditor({
    extensions: [StarterKit, BulletList, OrderedList, ListItem],
    content: data.description,
    onUpdate: ({ editor }) => {
      // Update form field value when editor content changes
      setValue("requirement", editor.getHTML(), { shouldValidate: true });
    },
  });
  const respon = useEditor({
    extensions: [StarterKit, BulletList, OrderedList, ListItem],
    content: data.description,
    onUpdate: ({ editor }) => {
      // Update form field value when editor content changes
      setValue("responsibility", editor.getHTML(), { shouldValidate: true });
    },
  });
  const bene = useEditor({
    extensions: [StarterKit, BulletList, OrderedList, ListItem],
    content: data.description,
    onUpdate: ({ editor }) => {
      // Update form field value when editor content changes
      setValue("benefit", editor.getHTML(), { shouldValidate: true });
    },
  });

  const updateHiringPostMutation = useUpdateHiringPost({
    mutationConfig: {
      onSuccess: () => {
        console.log("Update successful!");
        navigate(paths.app.career.hiringPost.root.getHref()); // Navigate after success
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    },
  });

  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Form Data:", formData);
    console.log(typeof formData.relatedField);
    updateHiringPostMutation.mutate({
      data: {
        categoryId: formData.categoryId,
        relatedFieldId: formData.relatedField,
        regionId: formData.region,
        status: formData.status || false,
        position: formData.position,
        locationId: formData.location,
        jobTypeId: formData.jobType,
        jobClose: formData.jobClose,
        description: formData.description,
        requirement: formData.requirement,
        responsibility: formData.responsibility,
        benefit: formData?.benefit,
      },
      id: data.id, // Ensure this value is correct
    });
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
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {categories?.data.find(
                        (item: any) => item.id === Number(field.value)
                      )?.name || "Select a category"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories?.data.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="w-full"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        {/* Rlated Field */}
        <div className="space-y-2 ">
          <Label className="font-medium">
            Related Fields<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="relatedField"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {relatedFields?.data.find(
                        (item: any) => item.id === Number(field.value)
                      )?.name || "Select a Related Field"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {relatedFields?.data.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="w-full"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
        {/* Regions*/}
        <div className="space-y-2 ">
          <Label className="font-medium">
            Region<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {regions?.data.find(
                        (item: any) => item.id === Number(field.value)
                      )?.name || "Select a Region"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {regions?.data.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="w-full"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        {/* Position Name */}
        <div className="space-y-2">
          <Label className="font-medium">
            Position Name<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="300+" className="mt-1" />
            )}
          />
        </div>

        {/* Location*/}
        <div className="space-y-2 ">
          <Label className="font-medium">
            Location<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {locations?.data.find(
                        (item: any) => item.id === Number(field.value)
                      )?.name || "Select a Location"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {locations?.data.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="w-full"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        {/* Job Type*/}
        <div className="space-y-2 ">
          <Label className="font-medium">
            Job Type<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {jobtypes?.data.find(
                        (item: any) => item.id === Number(field.value)
                      )?.name || "Select a jobtype"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {jobtypes?.data.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="w-full"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        {/* description */}
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

        {/* Requirements */}
        <div>
          <Label className="font-medium ">
            Requirements <span className="text-primaryText">*</span>
          </Label>
          {/* Toolbar */}
          <div className="flex gap-2 border-b pb-2 mb-2">
            {/* Bullet List */}
            <Button
              type="button"
              onClick={() => {
                if (require?.isActive("orderedList")) {
                  require.chain().focus().toggleOrderedList().run(); // Remove ordered list first
                }
                require?.chain().focus().toggleBulletList().run(); // Then toggle bullet list
              }}
              className={`p-1 hover:bg-transparent ${
                require?.isActive("bulletList")
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
                if (require?.isActive("bulletList")) {
                  require.chain().focus().toggleBulletList().run(); // Remove bullet list first
                }
                require?.chain().focus().toggleOrderedList().run(); // Then toggle ordered list
              }}
              className={`p-1 hover:bg-transparent ${
                require?.isActive("orderedList")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <FaListOl />
            </Button>
          </div>

          <Controller
            name="requirement"
            control={control}
            rules={{ required: "Description is required" }}
            render={() => (
              <div className="mt-2 border rounded-lg p-2 bg-white min-h-[150px]">
                <EditorContent
                  editor={require}
                  className="editor-content h-full" // Add a class for custom styling
                />
              </div>
            )}
          />
        </div>

        {/* Responsiblity */}
        <div>
          <Label className="font-medium ">
            Responsiblity <span className="text-primaryText">*</span>
          </Label>
          {/* Toolbar */}
          <div className="flex gap-2 border-b pb-2 mb-2">
            {/* Bullet List */}
            <Button
              type="button"
              onClick={() => {
                if (respon?.isActive("orderedList")) {
                  respon.chain().focus().toggleOrderedList().run(); // Remove ordered list first
                }
                respon?.chain().focus().toggleBulletList().run(); // Then toggle bullet list
              }}
              className={`p-1 hover:bg-transparent ${
                respon?.isActive("bulletList")
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
                if (respon?.isActive("bulletList")) {
                  respon.chain().focus().toggleBulletList().run(); // Remove bullet list first
                }
                respon?.chain().focus().toggleOrderedList().run(); // Then toggle ordered list
              }}
              className={`p-1 hover:bg-transparent ${
                require?.isActive("orderedList")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <FaListOl />
            </Button>
          </div>

          <Controller
            name="requirement"
            control={control}
            rules={{ required: "responsiblity is required" }}
            render={() => (
              <div className="mt-2 border rounded-lg p-2 bg-white min-h-[150px]">
                <EditorContent
                  editor={respon}
                  className="editor-content h-full" // Add a class for custom styling
                />
              </div>
            )}
          />
        </div>

        {/* Benefit & Allowance */}
        <div>
          <Label className="font-medium ">
            Benefit & Allowance <span className="text-primaryText">*</span>
          </Label>
          {/* Toolbar */}
          <div className="flex gap-2 border-b pb-2 mb-2">
            {/* Bullet List */}
            <Button
              type="button"
              onClick={() => {
                if (bene?.isActive("orderedList")) {
                  bene.chain().focus().toggleOrderedList().run(); // Remove ordered list first
                }
                bene?.chain().focus().toggleBulletList().run(); // Then toggle bullet list
              }}
              className={`p-1 hover:bg-transparent ${
                bene?.isActive("bulletList")
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
                if (bene?.isActive("bulletList")) {
                  bene.chain().focus().toggleBulletList().run(); // Remove bullet list first
                }
                bene?.chain().focus().toggleOrderedList().run(); // Then toggle ordered list
              }}
              className={`p-1 hover:bg-transparent ${
                require?.isActive("orderedList")
                  ? "bg-transparent text-foreground"
                  : "text-gray-300 bg-transparent"
              }`}
            >
              <FaListOl />
            </Button>
          </div>

          <Controller
            name="requirement"
            control={control}
            rules={{ required: "responsiblity is required" }}
            render={() => (
              <div className="mt-2 border rounded-lg p-2 bg-white min-h-[150px]">
                <EditorContent
                  editor={bene}
                  className="editor-content h-full" // Add a class for custom styling
                />
              </div>
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
            onClick={() =>
              navigate(paths.app.career.relatedFields.root.getHref())
            }
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
