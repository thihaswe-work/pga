import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { useBlog } from "@/features/blog/blogs/api/get-blog";
import EditForm from "@/features/blog/blogs/components/editform";
import { Blog } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const Id = Number(id) as number;
  const { data, isLoading } = useBlog({ id: Id });
  if (isLoading) return <Loading />;

  return (
    <ContentLayout title="category Edit">
      <EditForm data={data?.data as Blog} />
    </ContentLayout>
  );
}
