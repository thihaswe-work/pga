import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
interface Prop {
  id: number;
}

export default function EditForm({ id }: Prop) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      status: false,
      image: "/office.svg",
      createdAt: "2024-03-11T10:00:00Z",
      updatedAt: "2024-03-11T12:00:00Z",
    },
    {
      id: 2,
      image: "/office.svg",

      status: false,
      createdAt: "2024-03-10T09:30:00Z",
      updatedAt: "2024-03-11T11:30:00Z",
    },
    {
      id: 3,
      image: "/office.svg",

      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
    {
      id: 4,
      image: "/office.svg",
      status: true,
      createdAt: "2024-03-09T14:45:00Z",
      updatedAt: "2024-03-11T10:15:00Z",
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview URL
    }
  };
  // Find the current banner from `data`
  const currentBanner = data.find((banner) => banner.id === id);

  // Count how many banners are active
  const activeCount = data.filter((banner) => banner.status).length;

  // State for switch, initialized with current banner status
  const [isActive, setIsActive] = useState(currentBanner?.status || false);

  // Disable switch if there are already 2 active banners and current is inactive
  const isSwitchDisabled = activeCount >= 2 && !currentBanner?.status;

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
  return (
    <div className="flex w-full gap-8">
      <div className="max-w-[628px] space-y-6 w-full p-6 bg-background rounded-md">
        {/* Image Upload */}
        <Card className=" p-0 bg-secondaryBackground gap-0">
          <CardHeader>
            <Label className="font-medium w-full p-6 text-lg ">Image</Label>
          </CardHeader>
          <CardContent className=" bg-background p-6">
            {/* Drag & Drop Box */}
            <div
              className={` border-2 ${
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
            {image && (
              <div className="mt-4 flex flex-col items-center gap-4 bg-black text-white p-2 rounded-md pb-10">
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
                  <span className="text-sm">
                    {image.name} ({(image.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <img
                  src={imagePreview!}
                  alt="Preview"
                  className="w-[368px] h-[86px] rounded-md object-cover"
                />
              </div>
            )}
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
              disabled={isSwitchDisabled} // Disable switch if needed
              className={`data-[state=checked]:bg-switchCheck ${
                isSwitchDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            {isSwitchDisabled && (
              <p className="text-red-500 text-sm mt-2">
                Only 2 banners can be active at a time.
              </p>
            )}
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
              navigate(paths.app.banner.root.getHref());
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
