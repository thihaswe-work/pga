import { ContentLayout } from "@/components/layouts";
import EditForm from "@/features/blog/blogs/components/editform";

export default function EditPage() {
  return (
    <ContentLayout title="category Edit">
      <EditForm id={18} />
    </ContentLayout>
  );
}
