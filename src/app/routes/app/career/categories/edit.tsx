import { ContentLayout } from "@/components/layouts";
import Loading from "@/components/loading/loading";
import { useBlogCategory } from "@/features/blog/categories/api/get-blogCategory";
import EditForm from "@/features/career/categories/components/editform";
import { CareerCategory } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const Id = Number(id) as number;
  const { data, isLoading } = useBlogCategory({ id: Id });
  if (isLoading) return <Loading />;
  return (
    <ContentLayout title="category Edit">
      <EditForm data={data?.data as CareerCategory} />
    </ContentLayout>
  );
}
