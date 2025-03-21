import { ContentLayout } from "@/components/layouts/content-layout";
import EditForm from "@/features/home/components/editform";

import { useLocation } from "react-router";

export default function EditPage() {
  const location = useLocation();
  const pathname = decodeURI(location.pathname);
  const title = pathname.split("/")[3];
  // const homeId = String(14);
  // const { data } = useHome({ homeId }) as { data: any };
  // if (!data) return <Loading />;

  return (
    <ContentLayout title={`Editing ${title}`}>
      <EditForm
        data={{
          id: 1,
          sectionType: "Section 1",
          image: "/office.svg",
          header: "300+",
          label: "Get Started",
          description:
            "Discover the best features we offer and start your journey today!",
          status: false,
          createdAt: "2024-03-11T10:00:00Z",
          updatedAt: "2024-03-11T12:00:00Z",
        }}
      />
    </ContentLayout>
  );
}
