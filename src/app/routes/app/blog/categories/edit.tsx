import { ContentLayout } from "@/components/layouts";
import EditForm from "@/features/blog/categories/components/editform";

export default function EditPage() {
  return (
    <ContentLayout title="category Edit">
      <EditForm
        data={{
          id: 1,
          name: "tech",
          status: false,
          createdAt: "2024-03-11T10:00:00Z",
          updatedAt: "2024-03-11T12:00:00Z",
        }}
      />
    </ContentLayout>
  );
}
