import { ContentLayout } from "@/components/layouts";
import CreateForm from "@/features/blog/blogs/components/createform";

export default function CreatePage() {
  return (
    <ContentLayout title="Blog Create">
      <CreateForm />
    </ContentLayout>
  );
}
