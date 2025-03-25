import { DataTable } from "@/components/table/data-table";
import { paths } from "@/config/paths";
import { useDeleteBanner } from "@/features/banner/api/delete-banner";
import { getColumns } from "@/features/contact-messages/components/columns";
import {
  DeleteDialog,
  OpenDialog,
} from "@/features/contact-messages/components/dialog";
import { ContactMessage } from "@/types/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Page() {
  const [selectedDetail, setSelectedDetail] = useState<ContactMessage | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  // const { data, isLoading, isError } = useBanners({});
  const navigate = useNavigate();
  const deleteBannerMutation = useDeleteBanner({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.banner.root.getHref());
        setDialogDelete(false);
        toast("Banner Deleted");
      },
    },
  });
  const contactMessages: ContactMessage[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      message:
        "Hello, I wanted to reach out regarding an issue I've been experiencing with your platform. I've tried multiple times to reset my password, but every time I receive the email and follow the link, it says the reset token is invalid or expired. I've checked my spam folder, tried different browsers, and even cleared my cache, but nothing seems to work. Could you please assist me with this? I really need to access my account as soon as possible. Thank you for your help!",
      applyDate: "2025-03-25",
    },
    {
      id: 2,
      name: "Robert Smith",
      email: "robert.smith@example.com",
      message:
        "Hi there, I wanted to express my appreciation for the work you're doing. I've been using your service for the past year, and it has significantly improved my workflow. However, I do have a suggestion: would it be possible to add a feature where we can customize notifications for different activities? Right now, I get a lot of emails, and it would be great to have more control over what I receive. Let me know if this is something on your roadmap. Thanks!",
      applyDate: "2025-03-24",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      message:
        "Hello, I placed an order two weeks ago, and I still haven't received any updates on the shipping status. The estimated delivery time was supposed to be within a week, and I'm getting concerned because I need the item for an upcoming event. I've tried reaching out via phone, but I haven't been able to get through. Could you please check on the status of my order and provide me with an update? If there's any issue, I'd appreciate knowing as soon as possible. Thanks in advance!",
      applyDate: "2025-03-23",
    },
    {
      id: 4,
      name: "Daniel Brown",
      email: "daniel.brown@example.com",
      message:
        "Dear Support Team, I'm writing to report a bug that I've encountered while using your mobile app. Every time I try to upload an image, the app crashes and closes unexpectedly. I've tested this on both Wi-Fi and mobile data, but the issue persists. I'm using the latest version of the app on an iPhone 13 running iOS 17. It would be really helpful if you could look into this and let me know if there's a fix or if a patch is coming soon. Looking forward to your response.",
      applyDate: "2025-03-22",
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      message:
        "Hi, I recently attended one of your webinars, and I found it incredibly insightful! The speaker was knowledgeable, and the content was very relevant to my field. However, I noticed that the recording hasn't been uploaded yet, and I was hoping to review some parts that I missed. Do you have an estimated time when the recording will be available? Also, are there any additional resources or materials that you could share related to the topics discussed? Thank you so much for organizing these events!",
      applyDate: "2025-03-21",
    },
  ];

  // if (isLoading) return <Loading />;
  // if (isError) return <p className="text-red-500">Failed to fetch banners.</p>;
  const handleViewClick = (detail: ContactMessage) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: ContactMessage) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };

  return (
    <>
      {/* <Head title={title} /> */}
      <div className="py-6 w-full overflow-x-auto">
        <div className="mx-auto  px-4 sm:px-6 md:px-8">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {"Contact Messages"}
            </h1>
          </div>
        </div>
        <div className="mx-auto  px-4 py-6 sm:px-6 md:px-8 overflow-x-auto ">
          <div>
            <DataTable
              search="name"
              columns={getColumns(handleViewClick, handleViewDelete)}
              data={contactMessages || []} // Use fetched data
              pagination={true}
            />
            {selectedDetail && (
              <>
                <OpenDialog
                  detail={selectedDetail}
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                  navlink={paths.app.banner.edit.getHref(selectedDetail.id)}
                />
                <DeleteDialog
                  detail={selectedDetail}
                  open={dialogDelete}
                  setOpen={setDialogDelete}
                  deleteFunc={() => {
                    deleteBannerMutation.mutate({
                      bannerId: selectedDetail.id,
                    });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
