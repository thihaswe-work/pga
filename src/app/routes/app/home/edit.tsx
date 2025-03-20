import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { useHome } from "@/features/home/api/get-home";
import EditForm from "@/features/home/components/editform";

import { useLocation } from "react-router";

export default function EditPage() {
  const location = useLocation();
  const pathname = decodeURI(location.pathname);
  const title = pathname.split("/")[3];
  const homeId = String(14);
  const { data } = useHome({ homeId }) as { data: any };
  if (!data) return <Loading />;

  return (
    <ContentLayout title={`Editing ${title}`}>
      <EditForm data={data} />
    </ContentLayout>
  );
}
