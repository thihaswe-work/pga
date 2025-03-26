import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { CareerCategory } from "@/types/api";
import { getCareerCategoryQueryOptions } from "./get-carrerCategory";

export const updateCareerCategoryInputSchema = z.object({
  status: z.boolean(),
  name: z.string(),
});
export type UpdateCareerCategoryInput = z.infer<
  typeof updateCareerCategoryInputSchema
>;

export const updateCareerCategory = async ({
  data,
  id,
}: {
  data: UpdateCareerCategoryInput;
  id: number;
}): Promise<CareerCategory> => {
  try {
    console.log("Updating CareerCategory with Data:", data); // Log the data
    const response = await api.put(`/categories/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating CareerCategory:", error);
    throw error;
  }
};

type UseUpdateCareerCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCareerCategory>;
};

export const useUpdateCareerCategory = ({
  mutationConfig,
}: UseUpdateCareerCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCareerCategoryQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCareerCategory,
  });
};
