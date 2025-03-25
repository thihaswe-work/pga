import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getRelatedFieldsQueryOptions } from "./get-relatedFields";

export const deleteRelatedField = ({
  RelatedFieldId,
}: {
  RelatedFieldId: number;
}) => {
  return api.delete(`/RelatedField/${RelatedFieldId}`);
};

type UseDeleteRelatedFieldOptions = {
  mutationConfig?: MutationConfig<typeof deleteRelatedField>;
};

export const useDeleteRelatedField = ({
  mutationConfig,
}: UseDeleteRelatedFieldOptions = {}) => {
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
    mutationFn: deleteRelatedField,
  });
};
