import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { Blog } from "@/types/api";
import { getBlogsQueryOptions } from "./get-blogs";

export const createBlogInputSchema = z.object({
  status: z.boolean(),
  title: z.string(),
  description: z.string(),
  blogCategoryId: z.number(),
  image: z.any().nullable(),
});

export type CreateBlogInput = z.infer<typeof createBlogInputSchema>;

export const createBlog = ({
  data,
}: {
  data: CreateBlogInput;
}): Promise<Blog> => {
  return api.post(`/blogs`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateBlogOptions = {
  mutationConfig?: MutationConfig<typeof createBlog>;
};

export const useCreateBlog = ({
  mutationConfig,
}: UseCreateBlogOptions = {}) => {
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
    mutationFn: createBlog,
  });
};
