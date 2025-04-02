/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { RoleAndPermission } from "@/types/api";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function CreateForm() {
  const navigate = useNavigate();
  const roles: RoleAndPermission[] = [
    {
      id: 1,
      role: "Admin",
      systemModules: {
        systemModules1: {
          homePage: { edit: true, view: true },
          aboutUs: { edit: true, view: true },
        },
        systemModules2: {
          milestones: { create: true, edit: true, view: true, delete: true },
          banners: { create: true, edit: true, view: true, delete: true },
          blogs: { create: true, edit: true, view: true, delete: true },
          careers: { create: true, edit: true, view: true, delete: true },
        },
        systemModules3: {
          jobApplicationForms: { reply: true, view: true, delete: true },
          contactMessages: { reply: true, view: true, delete: true },
        },
        maintenance: {
          rolesAndPermissions: {
            create: true,
            edit: true,
            view: true,
            delete: true,
          },
          userMaintain: { create: true, edit: true, view: true, delete: true },
        },
      },
      status: true,
      permission: {
        canCreate: true,
        canView: true,
        canEdit: true,
        canDelete: true,
        canReply: true,
      },
      createdAt: "2024-03-01T12:00:00Z",
      updatedAt: "2024-03-10T15:30:00Z",
    },
    {
      id: 2,
      role: "Editor",
      systemModules: {
        systemModules1: {
          homePage: { edit: true, view: true },
          aboutUs: { edit: true, view: true },
        },
        systemModules2: {
          milestones: { create: true, edit: true, view: true, delete: false },
          banners: { create: true, edit: true, view: true, delete: false },
          blogs: { create: true, edit: true, view: true, delete: false },
          careers: { create: true, edit: true, view: true, delete: false },
        },
        systemModules3: {
          jobApplicationForms: { reply: false, view: true, delete: false },
          contactMessages: { reply: false, view: true, delete: false },
        },
        maintenance: {
          rolesAndPermissions: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
          userMaintain: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
        },
      },
      status: true,
      permission: {
        canCreate: true,
        canView: true,
        canEdit: true,
        canDelete: false,
        canReply: false,
      },
      createdAt: "2024-02-15T10:45:00Z",
      updatedAt: "2024-03-05T11:20:00Z",
    },
    {
      id: 3,
      role: "Viewer",
      systemModules: {
        systemModules1: {
          homePage: { edit: false, view: true },
          aboutUs: { edit: false, view: false },
        },
        systemModules2: {
          milestones: { create: false, edit: false, view: true, delete: false },
          banners: { create: false, edit: false, view: true, delete: false },
          blogs: { create: false, edit: false, view: true, delete: false },
          careers: { create: false, edit: false, view: true, delete: false },
        },
        systemModules3: {
          jobApplicationForms: { reply: false, view: true, delete: false },
          contactMessages: { reply: false, view: true, delete: false },
        },
        maintenance: {
          rolesAndPermissions: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
          userMaintain: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
        },
      },
      status: true,
      permission: {
        canCreate: false,
        canView: true,
        canEdit: false,
        canDelete: false,
        canReply: false,
      },
      createdAt: "2024-01-20T09:30:00Z",
      updatedAt: "2024-02-28T08:10:00Z",
    },
    {
      id: 4,
      role: "Moderator",
      systemModules: {
        systemModules1: {
          homePage: { edit: false, view: true },
          aboutUs: { edit: false, view: true },
        },
        systemModules2: {
          milestones: { create: false, edit: false, view: true, delete: true },
          banners: { create: false, edit: false, view: true, delete: true },
          blogs: { create: false, edit: false, view: true, delete: true },
          careers: { create: false, edit: false, view: true, delete: true },
        },
        systemModules3: {
          jobApplicationForms: { reply: true, view: true, delete: false },
          contactMessages: { reply: true, view: true, delete: false },
        },
        maintenance: {
          rolesAndPermissions: {
            create: false,
            edit: false,
            view: true,
            delete: false,
          },
          userMaintain: {
            create: false,
            edit: false,
            view: false,
            delete: false,
          },
        },
      },
      status: false,
      permission: {
        canCreate: false,
        canView: true,
        canEdit: false,
        canDelete: true,
        canReply: true,
      },
      createdAt: "2024-02-10T14:15:00Z",
      updatedAt: "2024-03-01T16:45:00Z",
    },
  ];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      status: false,
      roleId: "",
    },
  });

  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
  };

  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        {/* Header */}
        <div className="space-y-2">
          <Label className="font-medium">
            Role Name<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="" className="mt-1" />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">
            Login Email<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="" className="mt-1" />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label className="font-medium">
            Password<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="" className="mt-1" />
            )}
          />
        </div>

        {/* Role Select */}
        <div className="space-y-2 ">
          <Label className="font-medium">
            Role<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {roles?.find(
                        (role: RoleAndPermission) =>
                          role.id === Number(field.value)
                      )?.role || "Select a role"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {roles?.map((role: RoleAndPermission) => (
                      <SelectItem
                        key={role.id}
                        value={String(role.id)}
                        className="w-full"
                      >
                        {role.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => navigate(paths.app.userMaintain.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
