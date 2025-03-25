import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { RelatedField } from "@/types/api";
import { getRelatedFieldsQueryOptions } from "./get-relatedFields";

export const createRelatedFieldInputSchema = z.object({
  status: z.boolean(),
  name: z.string().min(1, "required"),
});

export type CreateRelatedFieldInput = z.infer<
  typeof createRelatedFieldInputSchema
>;

export const createRelatedField = ({
  data,
}: {
  data: CreateRelatedFieldInput;
}): Promise<RelatedField> => {
  return api.post(`/RelatedField`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateRelatedFieldOptions = {
  mutationConfig?: MutationConfig<typeof createRelatedField>;
};

export const useCreateRelatedField = ({
  mutationConfig,
}: UseCreateRelatedFieldOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRelatedFieldsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createRelatedField,
  });
};
