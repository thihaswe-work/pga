import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { getBlogCategoriesQueryOptions } from "./get-blogCategories";
export const deleteBlogCategory = ({
  blogCategoryId,
}: {
  blogCategoryId: number;
}) => {
  return api.delete(`/blogCategory/${blogCategoryId}`);
};

type UseDeleteBlogCategoryOptions = {
  mutationConfig?: MutationConfig<typeof deleteBlogCategory>;
};

export const useDeleteBlogCategory = ({
  mutationConfig,
}: UseDeleteBlogCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBlogCategoriesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteBlogCategory,
  });
};
