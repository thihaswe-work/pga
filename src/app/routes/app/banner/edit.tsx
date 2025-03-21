import { ContentLayout } from "@/components/layouts/content-layout";
import EditForm from "@/features/banner/components/editform";

export default function EditPage() {
  return (
    <ContentLayout title={`Editing Banner`}>
      <EditForm
        data={{
          id: 4,
          image: "/office.svg",
          status: false,
          createdAt: "2024-03-09T14:45:00Z",
          updatedAt: "2024-03-11T10:15:00Z",
        }}
      />
    </ContentLayout>
  );
}
