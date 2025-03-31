import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface ImageUploaderProps {
  imageFiles: (File | string | null)[]; // Array of File or string (URLs)
  onImageUpload: (event: ChangeEvent<HTMLInputElement>, index: number) => void; // Upload handler function
  onRemoveImage: (index: number) => void; // Remove handler function
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageFiles,
  onImageUpload,
  onRemoveImage,
}) => {
  return (
    <Card className="p-0 bg-secondaryBackground gap-0">
      <CardHeader>
        <Label className="font-medium w-full p-6 text-lg">Images</Label>
      </CardHeader>
      <CardContent className="bg-background p-6">
        {/* 23 Input Fields */}
        <div className="grid grid-cols-4 gap-10">
          {imageFiles.map((file, index) => (
            <div key={index} className="flex flex-col">
              <Label className="mb-5">Image{index + 1}</Label>
              <input
                type="file"
                className="p-2 border rounded-md"
                accept="image/*"
                onChange={(e) => onImageUpload(e, index)} // Call the parent handler for file upload
              />
              <div className="w-full h-[200px]">
                {file && typeof file === "string" ? (
                  // If the file is a URL (string)
                  <div className="mt-4 flex flex-col gap-4 bg-black text-white p-2 rounded-md pb-10 ">
                    <Button
                      size="sm"
                      onClick={() => onRemoveImage(index)} // Call the parent handler for removing image
                      className="text-xs"
                    >
                      X
                    </Button>
                    <img
                      src={file}
                      alt={`uploaded-${index}`}
                      className="w-[100px] h-[100px] rounded-md object-cover mr-2"
                    />
                  </div>
                ) : file && file instanceof File ? (
                  // If the file is a File object
                  <div className="mt-4 flex flex-col gap-4 bg-black text-white p-2 rounded-md pb-10 ">
                    <Button
                      size="sm"
                      onClick={() => onRemoveImage(index)} // Call the parent handler for removing image
                      className="text-xs"
                    >
                      X
                    </Button>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`uploaded-${index}`}
                      className="w-[100px] h-[100px] rounded-md object-cover mr-2"
                    />
                  </div>
                ) : (
                  <div>No Image</div> // If no image (null)
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
