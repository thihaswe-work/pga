import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getRegionsQueryOptions } from "./get-regions";

export const deleteRegion = ({ RegionId }: { RegionId: number }) => {
  return api.delete(`/Region/${RegionId}`);
};

type UseDeleteRegionOptions = {
  mutationConfig?: MutationConfig<typeof deleteRegion>;
};

export const useDeleteRegion = ({
  mutationConfig,
}: UseDeleteRegionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRegionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteRegion,
  });
};
