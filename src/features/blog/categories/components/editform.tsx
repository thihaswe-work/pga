import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { paths } from "@/config/paths";
import { useState } from "react";
import { useNavigate } from "react-router";
interface Prop {
  data: any;
}

export default function EditForm({ data }: Prop) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        <Label htmlFor="category" className="font-semibold">
          Categories Name <span className="text-red-500">*</span>
        </Label>
        <Card className="border border-gray-300 rounded-md">
          <CardContent className="p-2 px-4">
            <Input
              id="category"
              defaultValue="Information Technology"
              className="border-none focus:ring-0 bg-secondaryBackground"
            />
          </CardContent>
        </Card>
      </div>
      {/* Status Toggle */}
      <div className="w-full max-w-[436px] space-y-6">
        <div className="flex justify-between border flex-col rounded-lg bg-background">
          <Label className="font-medium px-6 py-4">Active</Label>
          <div className="h-[1px] w-full bg-[#e9e9ea]"></div>
          <div className="p-6">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className={`data-[state=checked]:bg-switchCheck`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="default" className="bg-primaryText hover:bg-red-500">
            Save changes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigate(paths.app.blog.categories.root.getHref());
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
