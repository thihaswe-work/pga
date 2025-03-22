import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { useHome } from "@/features/home/api/get-home";
import EditForm from "@/features/home/components/editform";
import { Home } from "@/types/api";

import { useLocation, useParams } from "react-router";

export default function EditPage() {
  const location = useLocation();
  const pathname = decodeURI(location.pathname);
  const title = pathname.split("/")[3];
  const { section } = useParams();
  const homeSection = section as string;
  const { data: home, isLoading, isError } = useHome({ homeSection });
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch home.</p>;
  return (
    <ContentLayout title={`Editing ${title}`}>
      <EditForm data={home?.data as Home} />
    </ContentLayout>
  );
}
