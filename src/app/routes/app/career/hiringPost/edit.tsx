import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { useHiringPost } from "@/features/career/hiringPost/api/get-hiringPost";
import EditForm from "@/features/career/hiringPost/components/editform";

import { HiringPost } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const Id = Number(id) as number;
  const { data, isLoading } = useHiringPost({ id: Id });
  if (isLoading) return <Loading />;
  return (
    <ContentLayout title="Hiring Post Edit">
      <EditForm data={data?.data as HiringPost} />
    </ContentLayout>
  );
}
