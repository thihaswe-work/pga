import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { BlogCategory } from "@/types/api";
import { getBlogCategoriesQueryOptions } from "./get-blogCategories";

export const createBlogCategoryInputSchema = z.object({
  status: z.boolean(),
  name: z.string().min(1, "required"),
});

export type CreateBlogCategoryInput = z.infer<
  typeof createBlogCategoryInputSchema
>;

export const createBlogCategory = ({
  data,
}: {
  data: CreateBlogCategoryInput;
}): Promise<BlogCategory> => {
  return api.post(`/blogCategory`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateBlogCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createBlogCategory>;
};

export const useCreateBlogCategory = ({
  mutationConfig,
}: UseCreateBlogCategoryOptions = {}) => {
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
    mutationFn: createBlogCategory,
  });
};
