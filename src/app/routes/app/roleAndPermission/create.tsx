import { ContentLayout } from "@/components/layouts";
import CreateForm from "@/features/roleAndPermission/components/createform";

export default function CreatePage() {
  return (
    <ContentLayout title="Create Roles">
      <CreateForm />
    </ContentLayout>
  );
}
