/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentLayout } from "@/components/layouts/content-layout";
import EditForm from "@/features/roleAndPermission/components/editform";
import { useParams } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const roleId = Number(id) as number;
  return (
    <ContentLayout title={`Editing Milestone`}>
      <EditForm
        data={{
          id: 3,
          role: "Viewer",
          systemModules: {
            systemModules1: {
              homePage: { edit: false, view: true },
              aboutUs: { edit: false, view: true },
            },
            systemModules2: {
              milestones: {
                create: false,
                edit: false,
                view: true,
                delete: false,
              },
              banners: {
                create: false,
                edit: false,
                view: true,
                delete: false,
              },
              blogs: { create: false, edit: false, view: true, delete: false },
              careers: {
                create: false,
                edit: false,
                view: true,
                delete: false,
              },
            },
            systemModules3: {
              jobApplicationForms: { reply: false, view: true, delete: false },
              contactMessages: { reply: false, view: true, delete: false },
            },
            maintenance: {
              rolesAndPermissions: {
                create: false,
                edit: false,
                view: true,
                delete: false,
              },
              userMaintain: {
                create: false,
                edit: false,
                view: true,
                delete: false,
              },
            },
          },
          status: true,
          permission: {
            canCreate: false,
            canView: true,
            canEdit: false,
            canDelete: false,
            canReply: false,
          },
          createdAt: "2024-01-20T09:30:00Z",
          updatedAt: "2024-02-28T08:10:00Z",
        }}
      />
    </ContentLayout>
  );
}
