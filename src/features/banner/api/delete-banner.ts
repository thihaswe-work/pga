import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { getBannersQueryOptions } from "./get-banners";
export const deleteBanner = ({ bannerId }: { bannerId: number }) => {
  return api.delete(`/banner/${bannerId}`);
};

type UseDeleteBannerOptions = {
  mutationConfig?: MutationConfig<typeof deleteBanner>;
};

export const useDeleteBanner = ({
  mutationConfig,
}: UseDeleteBannerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBannersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteBanner,
  });
};
