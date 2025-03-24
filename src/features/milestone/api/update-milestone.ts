import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Milestone } from "@/types/api";
import { getMilestoneQueryOptions } from "./get-milestone";

export const updateMileStoneInputSchema = z.object({
  status: z.boolean(),
  image: z.any().nullable(),
  icon: z.any().nullable(),
  title: z.string(),
  description: z.string(),
  link: z.string(),
  timeline: z.number(),
  colorCode: z.string(),
});
export type UpdateMileStoneInput = z.infer<typeof updateMileStoneInputSchema>;

export const updateMilestone = async ({
  data,
  id,
}: {
  data: UpdateMileStoneInput;
  id: number;
}): Promise<Milestone> => {
  try {
    console.log("Updating MileStone with Data:", data); // Log the data
    const response = await api.put(`/Milestone/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Milestone:", error);
    throw error;
  }
};

type UseUpdateMilestoneOptions = {
  mutationConfig?: MutationConfig<typeof updateMilestone>;
};

export const useUpdateMilestone = ({
  mutationConfig,
}: UseUpdateMilestoneOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getMilestoneQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateMilestone,
  });
};
