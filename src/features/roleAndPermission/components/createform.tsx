/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { paths } from "@/config/paths";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function CreateForm() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      status: false,
      systemModules1: {
        homePage: {
          edit: false,
          view: false,
        },
        aboutUs: {
          edit: false,
          view: false,
        },
      },
      systemModules2: {
        milestones: {
          create: false,
          edit: false,
          view: false,
          delete: false,
        },
        banners: {
          create: false,
          edit: false,
          view: false,
          delete: false,
        },
        blogs: {
          create: false,
          edit: false,
          view: false,
          delete: false,
        },

        careers: {
          create: false,
          edit: false,
          view: false,
          delete: false,
        },
      },
      systemModules3: {
        jobApplicationForms: {
          reply: false,
          view: false,
          delete: false,
        },
        contactMessages: {
          reply: false,
          view: false,
          delete: false,
        },
      },
      maintenance: {
        rolesAndPermissions: {
          create: false,
          edit: false,
          view: false,
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
  });

  // Form Submission
  const onSubmit = (formData: any) => {
    console.log("Submitting Form Data:", formData);
  };

  const permissions = ["create", "edit", "view", "delete"];
  const modules1 = [
    { name: "HomePage", key: "homePage", permissions: ["edit", "view"] },
    { name: "About Us", key: "aboutUs", permissions: ["edit", "view"] },
  ];
  const modules2 = [
    { name: "Milestones", key: "milestones", permissions },
    { name: "Banners", key: "banners", permissions },
    { name: "Blogs", key: "blogs", permissions },
    { name: "Careers", key: "careers", permissions },
  ];
  const modules3 = [
    {
      name: "Job Application Forms",
      key: "jobApplicationForms",
      permissions: ["reply", "view", "delete"],
    },
    {
      name: "Contact Messages",
      key: "contactMessages",
      permissions: ["reply", "view", "delete"],
    },
  ];

  const maintenance = [
    { name: "Roles And Permissions", key: "rolesAndPermissions", permissions },
    { name: "User Maintain", key: "userMaintain", permissions },
  ];
  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        {/* Header */}
        <div className="space-y-2">
          <Label className="font-medium">
            Role Name<span className="text-primaryText">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="" className="mt-1" />
            )}
          />
        </div>

        {/* system modules 1 */}
        <div className="space-y-2">
          <Label>System Modules 1</Label>
          <div className="flex justify-between w-full">
            {modules1.map(({ name, key, permissions }) => (
              <PermissionCard
                key={key}
                moduleName={name}
                moduleKey={key}
                control={control}
                availablePermissions={permissions}
                parentModule={"systemModules1"}
              />
            ))}
          </div>
        </div>

        {/* System Modules 2 */}
        <div className="space-y-2">
          <Label>System Modules 2</Label>
          <div className="grid grid-cols-2 gap-5 w-full">
            {modules2.map(({ name, key, permissions }) => (
              <PermissionCard
                parentModule="systemModules2"
                key={key}
                moduleName={name}
                moduleKey={key}
                control={control}
                availablePermissions={permissions}
              />
            ))}
          </div>
        </div>

        {/* system modules 3 */}
        <div className="space-y-2">
          <Label>System Modules 3</Label>
          <div className="grid grid-cols-2 gap-5 w-full">
            {modules3.map(({ name, key, permissions }) => (
              <PermissionCard
                parentModule="systemModules3"
                key={key}
                moduleName={name}
                moduleKey={key}
                control={control}
                availablePermissions={permissions}
              />
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div className="space-y-2">
          <Label>Maintenance</Label>{" "}
          <div className="grid grid-cols-2 gap-5 w-full">
            {/* Roles and Permissions */}
            {maintenance.map(({ name, key, permissions }) => (
              <PermissionCard
                key={key}
                moduleName={name}
                moduleKey={key}
                control={control}
                availablePermissions={permissions}
                parentModule={"maintenance"}
              />
            ))}
          </div>
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
            onClick={() => navigate(paths.app.roleAndPermission.root.getHref())}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

const PermissionCard = ({
  moduleName,
  parentModule,
  control,
  moduleKey,
  availablePermissions,
}: {
  moduleName: string;
  parentModule: string;
  control: any;
  moduleKey: string;
  availablePermissions: string[];
}) => (
  <Card className="bg-secondaryBackground w-[278px]">
    <CardContent className="flex flex-col gap-5">
      <CardTitle className="text-xl">{moduleName}</CardTitle>
      {availablePermissions.map((permission) => (
        <div key={permission} className="flex justify-between rounded-lg">
          <Label className="font-medium">{`${
            permission.charAt(0).toUpperCase() + permission.slice(1)
          } Permission`}</Label>
          <Controller
            name={`${parentModule}.${moduleKey}.${permission}`}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-switchCheck"
              />
            )}
          />
        </div>
      ))}
    </CardContent>
  </Card>
);
