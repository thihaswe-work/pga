import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import EditForm from "@/features/aboutus/components/editform";
import { useAboutUs } from "@/features/aboutus/api/get-aboutUs";
import { AboutUs } from "@/types/api";
import { useLocation, useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import ImageUploader from "@/features/aboutus/components/imageUploader";

export default function EditPage() {
  const location = useLocation();
  const pathname = decodeURI(location.pathname);
  const title = pathname.split("/")[3];
  const { section } = useParams();
  const [imageFiles, setImageFiles] = useState<(File | string | null)[]>(
    Array(23).fill(null)
  ); // Accept both strings and files
  const AboutUsSection = section as string;
  const { data: AboutUs, isLoading, isError } = useAboutUs({ AboutUsSection });

  useEffect(() => {
    if (AboutUs?.data.images) {
      setImageFiles(AboutUs.data.images); // Assuming AboutUs.data.image contains URLs or file paths as strings
    }
  }, [AboutUs]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFiles = [...imageFiles];
    newFiles[index] = event.target.files ? event.target.files[0] : null; // Handle File upload
    setImageFiles(newFiles);
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles[index] = null; // Remove the image at that index
    setImageFiles(newFiles);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch AboutUs.</p>;

  return (
    <ContentLayout title={`Editing ${title}`}>
      <div>
        {AboutUsSection === "section5" ? (
          <Tabs defaultValue="content" className="flex flex-col flex-grow">
            <TabsList className="flex justify-center bg-transparent p-2">
              <TabsTrigger
                value="content"
                className="data-[state=active]:text-primaryText data-[state=active]:border-b-2 data-[state=active]:border-b-primaryText data-[state=active]:shadow-none data-[state=active]:rounded-none pb-5 data-[state=active]:bg-transparent"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:text-primaryText data-[state=active]:border-b-2 data-[state=active]:border-b-primaryText data-[state=active]:shadow-none data-[state=active]:rounded-none pb-5 data-[state=active]:bg-transparent"
              >
                Images
              </TabsTrigger>
            </TabsList>

            <div className="flex-grow">
              <TabsContent
                value="content"
                className="w-full h-full flex items-center justify-center"
              >
                <EditForm data={AboutUs?.data as AboutUs} images={imageFiles} />
              </TabsContent>

              <TabsContent
                value="images"
                className="w-full h-full flex items-center justify-center"
              >
                <ImageUploader
                  imageFiles={imageFiles}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={handleRemoveImage}
                />
              </TabsContent>
            </div>
          </Tabs>
        ) : (
          <EditForm data={AboutUs?.data as AboutUs} />
        )}
      </div>
    </ContentLayout>
  );
}
