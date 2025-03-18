import { ContentLayout } from "@/components/layouts/content-layout";
import EditForm from "@/features/banner/components/editform";
import { useParams } from "react-router";

export default function BannerEdit() {
  const { id } = useParams<{ id: string }>();

  return (
    <ContentLayout title={`Editing Banner`}>
      <EditForm id={Number(id)} />
    </ContentLayout>
  );
}
