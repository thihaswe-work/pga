/* eslint-disable react-hooks/rules-of-hooks */
import { ContentLayout } from "@/components/layouts/content-layout";
import Loading from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog, OpenDialog } from "@/components/table/dialog";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useDeleteBanner } from "@/features/banner/api/delete-banner";
import { useBanners } from "@/features/banner/api/get-banners";
import { Banner, getColumns } from "@/features/banner/components/columns";

import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function BannerPage() {
  const [selectedDetail, setSelectedDetail] = useState<Banner | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const navigate = useNavigate();

  const { data: banner, isLoading, isError } = useBanners({});

  const deleteBannerMutation = useDeleteBanner({
    mutationConfig: {
      onSuccess: () => {
        navigate(paths.app.banner.root.getHref());
        setDialogDelete(false);
        toast("Banner Deleted");
      },
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to fetch banners.</p>;
  if (!banner) return <p>no banners found</p>;
  const handleViewClick = (detail: Banner) => {
    setSelectedDetail(detail);
    setDialogOpen(true);
  };
  const handleViewDelete = (detail: Banner) => {
    setSelectedDetail(detail);
    setDialogDelete(true);
  };

  return (
    <ContentLayout
      title={"Banner"}
      create={
        <Button
          className="bg-primaryText hover:bg-red-500 "
          onClick={() => {
            navigate(paths.app.banner.create.getHref());
          }}
        >
          Create New Banner
        </Button>
      }
    >
      <div className="">
        <DataTable
          columns={getColumns(handleViewClick, handleViewDelete)}
          data={banner?.data}
          pagination={false}
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
                deleteBannerMutation.mutate({ bannerId: selectedDetail.id });
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
}
