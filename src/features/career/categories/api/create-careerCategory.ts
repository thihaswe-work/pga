import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { CareerCategory } from "@/types/api";
import { getCareerCategoriesQueryOptions } from "./get-careerCategories";

export const createCareerCategoryInputSchema = z.object({
  status: z.boolean(),
  name: z.string().min(1, "required"),
});

export type CreateCareerCategoryInput = z.infer<
  typeof createCareerCategoryInputSchema
>;

export const createCareerCategory = ({
  data,
}: {
  data: CreateCareerCategoryInput;
}): Promise<CareerCategory> => {
  return api.post(`/CareerCategory`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateCareerCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCareerCategory>;
};

export const useCreateCareerCategory = ({
  mutationConfig,
}: UseCreateCareerCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCareerCategoriesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCareerCategory,
  });
};
