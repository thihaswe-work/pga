import { ContentLayout } from "@/components/layouts";
import EditForm from "@/features/blog/blogs/components/editform";
import { useHome } from "@/features/home/api/get-home";

export default function EditPage() {
  const blogId = String(14);
  const { data } = useHome({ blogId }) as { data: any };
  return (
    <ContentLayout title="category Edit">
      <EditForm
        data={data}
        categories={{
          id: 0,
          name: "",
          status: false,
          createdAt: "",
          updatedAt: "",
        }}
      />
    </ContentLayout>
  );
}
