import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { useMilestone } from "@/features/milestone/api/get-milestone";
import EditForm from "@/features/milestone/components/editform";
import { Milestone } from "@/types/api";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const MilestoneId = Number(id) as number;
  const { data: milestone, isLoading } = useMilestone({ id: MilestoneId });
  if (isLoading) return <Loading />;

  return (
    <ContentLayout title={`Editing Milestone`}>
      <EditForm data={milestone?.data as Milestone} />
    </ContentLayout>
  );
}
