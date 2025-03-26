import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Region } from "@/types/api";
import { getRegionQueryOptions } from "./get-region";

export const updateRegionInputSchema = z.object({
  status: z.boolean(),
  image: z.any().nullable(),
  name: z.string(),
});
export type UpdateRegionInput = z.infer<typeof updateRegionInputSchema>;

export const updateRegion = async ({
  data,
  id,
}: {
  data: UpdateRegionInput;
  id: number;
}): Promise<Region> => {
  try {
    console.log("Updating Region with Data:", data); // Log the data
    const response = await api.put(`/regions/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Region:", error);
    throw error;
  }
};

type UseUpdateRegionOptions = {
  mutationConfig?: MutationConfig<typeof updateRegion>;
};

export const useUpdateRegion = ({
  mutationConfig,
}: UseUpdateRegionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getRegionQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateRegion,
  });
};
