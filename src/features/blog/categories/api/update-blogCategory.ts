import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { BlogCategory } from "@/types/api";
import { getBlogCategoryQueryOptions } from "./get-blogCategory";

export const updateBlogCategoryInputSchema = z.object({
  status: z.boolean(),
  name: z.string(),
});
export type UpdateBlogCategoryInput = z.infer<
  typeof updateBlogCategoryInputSchema
>;

export const updateBlogCategory = async ({
  data,
  id,
}: {
  data: UpdateBlogCategoryInput;
  id: number;
}): Promise<BlogCategory> => {
  try {
    console.log("Updating BlogCategory with Data:", data); // Log the data
    const response = await api.put(`/blogCategory/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating BlogCategory:", error);
    throw error;
  }
};

type UseUpdateBlogCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateBlogCategory>;
};

export const useUpdateBlogCategory = ({
  mutationConfig,
}: UseUpdateBlogCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getBlogCategoryQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBlogCategory,
  });
};
