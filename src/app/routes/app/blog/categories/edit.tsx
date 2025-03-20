import { ContentLayout } from "@/components/layouts";
import EditForm from "@/features/blog/categories/components/editform";

export default function EditPage() {
  return (
    <ContentLayout title="category Edit">
      <EditForm data={""} />
    </ContentLayout>
  );
}
