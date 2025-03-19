import { ContentLayout } from "@/components/layouts/content-layout";
import EditForm from "@/features/home/components/editform";

import { useLocation } from "react-router";

export default function EditPage() {
  const location = useLocation();
  const pathname = decodeURI(location.pathname);
  const title = pathname.split("/")[3];

  return (
    <ContentLayout title={`Editing ${title}`}>
      <EditForm />
    </ContentLayout>
  );
}
