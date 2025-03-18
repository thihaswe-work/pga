import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Discussion } from "@/types/api";
import { getHomeQueryOptions } from "./get-home";

export const updateHomeInputSchema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

export type UpdateHomeInput = z.infer<typeof updateHomeInputSchema>;

export const updateHome = ({
  data,
  homeId,
}: {
  data: UpdateHomeInput;
  homeId: string;
}): Promise<any> => {
  return api.put(`/products/${homeId}`, data);
};

type UseUpdateHomeOptions = {
  mutationConfig?: MutationConfig<typeof updateHome>;
};

export const useUpdateHome = ({
  mutationConfig,
}: UseUpdateHomeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getHomeQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateHome,
  });
};
