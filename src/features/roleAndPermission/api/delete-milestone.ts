import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { getMilestonesQueryOptions } from "./get-milestones";
export const deleteMilestone = ({ milestoneId }: { milestoneId: number }) => {
  return api.delete(`/milestones/${milestoneId}`);
};

type UseDeleteMilestoneOptions = {
  mutationConfig?: MutationConfig<typeof deleteMilestone>;
};

export const useDeleteMilestone = ({
  mutationConfig,
}: UseDeleteMilestoneOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getMilestonesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteMilestone,
  });
};
