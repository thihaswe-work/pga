import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { getCareerCategoriesQueryOptions } from "./get-careerCategories";
export const deleteCareerCategory = ({
  CareerCategoryId,
}: {
  CareerCategoryId: number;
}) => {
  return api.delete(`/categories/${CareerCategoryId}`);
};

type UseDeleteCareerCategoryOptions = {
  mutationConfig?: MutationConfig<typeof deleteCareerCategory>;
};

export const useDeleteCareerCategory = ({
  mutationConfig,
}: UseDeleteCareerCategoryOptions = {}) => {
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
    mutationFn: deleteCareerCategory,
  });
};
