import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { getBlogQueryOptions } from "./get-blog";
import { Blog } from "@/types/api";

export const updateBlogInputSchema = z.object({
  status: z.boolean(),
  title: z.string(),
  description: z.string(),
  blogCategoryId: z.number(),
  image: z.any().nullable(),
});
export type UpdateBlogInput = z.infer<typeof updateBlogInputSchema>;

export const updateBlog = async ({
  data,
  id,
}: {
  data: UpdateBlogInput;
  id: number;
}): Promise<Blog> => {
  try {
    console.log("Updating Blog with Data:", data); // Log the data
    const response = await api.put(`/blogs/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Blog:", error);
    throw error;
  }
};

type UseUpdateBlogOptions = {
  mutationConfig?: MutationConfig<typeof updateBlog>;
};

export const useUpdateBlog = ({
  mutationConfig,
}: UseUpdateBlogOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getBlogQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBlog,
  });
};
