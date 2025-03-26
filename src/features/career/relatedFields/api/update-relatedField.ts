import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { RelatedField } from "@/types/api";
import { getRelatedFieldQueryOptions } from "./get-relatedField";

export const updateRelatedFieldInputSchema = z.object({
  status: z.boolean(),
  name: z.string(),
});
export type UpdateRelatedFieldInput = z.infer<
  typeof updateRelatedFieldInputSchema
>;

export const updateRelatedField = async ({
  data,
  id,
}: {
  data: UpdateRelatedFieldInput;
  id: number;
}): Promise<RelatedField> => {
  try {
    console.log("Updating RelatedField with Data:", data); // Log the data
    const response = await api.put(`/related-field/${id}`, data, {});
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating RelatedField:", error);
    throw error;
  }
};

type UseUpdateRelatedFieldOptions = {
  mutationConfig?: MutationConfig<typeof updateRelatedField>;
};

export const useUpdateRelatedField = ({
  mutationConfig,
}: UseUpdateRelatedFieldOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getRelatedFieldQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateRelatedField,
  });
};
