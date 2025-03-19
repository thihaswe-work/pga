import { ContentLayout } from "@/components/layouts";
import CreateForm from "@/features/blog/categories/components/createform";

export default function CreatePage() {
  return (
    <ContentLayout title="category Create">
      <CreateForm />
    </ContentLayout>
  );
}
