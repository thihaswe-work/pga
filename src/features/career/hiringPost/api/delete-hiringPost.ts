import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getHiringPostsQueryOptions } from "./get-hiringPosts";

export const deleteHiringPost = ({
  HiringPostId,
}: {
  HiringPostId: number;
}) => {
  return api.delete(`/hiringpost/${HiringPostId}`);
};

type UseDeleteHiringPostOptions = {
  mutationConfig?: MutationConfig<typeof deleteHiringPost>;
};

export const useDeleteHiringPost = ({
  mutationConfig,
}: UseDeleteHiringPostOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getHiringPostsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteHiringPost,
  });
};
