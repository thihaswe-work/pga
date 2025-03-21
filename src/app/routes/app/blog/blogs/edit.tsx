import { ContentLayout } from "@/components/layouts";
import EditForm from "@/features/blog/blogs/components/editform";

export default function EditPage() {
  return (
    <ContentLayout title="category Edit">
      <EditForm
        categories={[
          {
            id: 1,
            name: "tech",
            status: false,
            createdAt: "2024-03-11T10:00:00Z",
            updatedAt: "2024-03-11T12:00:00Z",
          },
          {
            id: 2,
            name: "health",
            status: false,
            createdAt: "2024-03-10T09:30:00Z",
            updatedAt: "2024-03-11T11:30:00Z",
          },
          {
            id: 3,
            name: "lifestyle",
            status: true,
            createdAt: "2024-03-09T14:45:00Z",
            updatedAt: "2024-03-11T10:15:00Z",
          },
          {
            id: 4,
            name: "finance",
            status: true,
            createdAt: "2024-03-08T12:00:00Z",
            updatedAt: "2024-03-10T15:30:00Z",
          },
          {
            id: 5,
            name: "education",
            status: false,
            createdAt: "2024-03-07T11:20:00Z",
            updatedAt: "2024-03-09T14:10:00Z",
          },
        ]}
        data={{
          id: 1,
          status: false,
          title: "blogcategory",
          categoryId: 5,
          description: `ipsum dolor sit amet consectetur adipisicing elit. Nulla esse eos necessitatibus maxime expedita mollitia nisi perspiciatis vero possimus qui nihil tempore accusantium quam, corporis consequuntur rerum o?`,
          image: "/office.svg",
          createdAt: "2024-03-11T10:00:00Z",
          updatedAt: "2024-03-11T12:00:00Z",
        }}
      />
    </ContentLayout>
  );
}
