import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { useRegion } from "@/features/career/regions/api/get-region";
import EditForm from "@/features/career/regions/components/editform";
import { Region } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const Id = Number(id) as number;
  const { data, isLoading } = useRegion({ id: Id });
  if (isLoading) return <Loading />;
  return (
    <ContentLayout title="category Edit">
      <EditForm data={data?.data as Region} />
    </ContentLayout>
  );
}
