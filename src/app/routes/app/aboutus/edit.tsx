import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import EditForm from "@/features/aboutus/components/editform";
import { useAboutUs } from "@/features/aboutus/api/get-aboutUs";

import { AboutUs } from "@/types/api";

import { useLocation, useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditPage() {
  const location = useLocation();
  const pathname = decodeURI(location.pathname);
  const title = pathname.split("/")[3];
  const { section } = useParams();
  const AboutUsSection = section as string;
  const { data: AboutUs, isLoading, isError } = useAboutUs({ AboutUsSection });
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch AboutUs.</p>;
  return (
    <ContentLayout title={`Editing ${title}`}>
      <div>
        <Tabs defaultValue="content" className="flex flex-col flex-grow">
          {/* Tab Buttons */}
          <TabsList className="flex justify-center bg-transparent p-2">
            <TabsTrigger
              value="content"
              className=" data-[state=active]:text-primaryText data-[state=active]:border-b-2 data-[state=active]:border-b-primaryText data-[state=active]:shadow-none  data-[state=active]:rounded-none pb-5 data-[state=active]:bg-transparent "
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className=" data-[state=active]:text-primaryText data-[state=active]:border-b-2 data-[state=active]:border-b-primaryText data-[state=active]:shadow-none  data-[state=active]:rounded-none pb-5 data-[state=active]:bg-transparent "
            >
              Images
            </TabsTrigger>
          </TabsList>

          {/* Tab Content - Takes Full Screen */}
          <div className="flex-grow ">
            <TabsContent
              value="content"
              className="w-full h-full flex items-center justify-center "
            >
              <EditForm data={AboutUs?.data as AboutUs} />
            </TabsContent>

            <TabsContent
              value="images"
              className="w-full h-full flex items-center justify-center "
            >
              <p className="text-2xl">This is the Images Page</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </ContentLayout>
  );
}
