import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { getBlogsQueryOptions } from "./get-blogs";
export const deleteBlog = ({ blogId }: { blogId: number }) => {
  return api.delete(`/blogs/${blogId}`);
};

type UseDeleteBlogOptions = {
  mutationConfig?: MutationConfig<typeof deleteBlog>;
};

export const useDeleteBlog = ({
  mutationConfig,
}: UseDeleteBlogOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBlogsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteBlog,
  });
};
