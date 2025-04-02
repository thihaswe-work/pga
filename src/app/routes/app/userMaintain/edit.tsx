import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import EditForm from "@/features/userMaintain/components/editform";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const userId = Number(id) as number;
  // const { data: userMaintain, isLoading } = useMilestone({ id: userId });
  // if (isLoading && !userMaintain) return <Loading />;
  return (
    <ContentLayout title={`Editing UserMaintain`}>
      <EditForm
        data={{
          id: 1,
          username: "lromero",
          roleId: 2,
          email: "martinezanthony@gmail.com",
          password: "123",
          status: true,
          createdAt: "2022-12-21",
          updatedAt: "2024-09-12",
        }}
      />
      {/* <EditForm data={userMaintain?.data as Milestone} /> */}
    </ContentLayout>
  );
}
