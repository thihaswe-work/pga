import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { useBanner } from "@/features/banner/api/get-banner";
import EditForm from "@/features/banner/components/editform";
import { Banner } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const bannerId = Number(id) as number;
  const { data: banner, isLoading } = useBanner({ id: bannerId });
  if (isLoading) return <Loading />;

  return (
    <ContentLayout title={`Editing Banner`}>
      <EditForm data={banner?.data as Banner} />
    </ContentLayout>
  );
}
