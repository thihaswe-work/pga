import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { Region } from "@/types/api";
import { getRegionsQueryOptions } from "./get-regions";

export const createRegionInputSchema = z.object({
  status: z.boolean(),
  name: z.string().min(1, "required"),
});

export type CreateRegionInput = z.infer<typeof createRegionInputSchema>;

export const createRegion = ({
  data,
}: {
  data: CreateRegionInput;
}): Promise<Region> => {
  return api.post(`/Region`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateRegionOptions = {
  mutationConfig?: MutationConfig<typeof createRegion>;
};

export const useCreateRegion = ({
  mutationConfig,
}: UseCreateRegionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRegionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createRegion,
  });
};
