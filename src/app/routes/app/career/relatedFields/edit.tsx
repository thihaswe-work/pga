import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { useRelatedField } from "@/features/career/relatedFields/api/get-relatedField";
import EditForm from "@/features/career/relatedFields/components/editform";
import { RelatedField } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const Id = Number(id) as number;
  const { data, isLoading } = useRelatedField({ id: Id });
  if (isLoading) return <Loading />;
  return (
    <ContentLayout title="category Edit">
      <EditForm data={data?.data as RelatedField} />
    </ContentLayout>
  );
}
