import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { Milestone } from "@/types/api";
import { getMilestonesQueryOptions } from "./get-milestones";

export const createMilestoneInputSchema = z.object({
  status: z.boolean(),
  image: z.any().nullable(),
  icon: z.any().nullable(),
  title: z.string(),
  description: z.string(),
  link: z.string(),
  timeline: z.number(),
});

export type CreateMilestoneInput = z.infer<typeof createMilestoneInputSchema>;

export const createMilestone = ({
  data,
}: {
  data: CreateMilestoneInput;
}): Promise<Milestone> => {
  return api.post(`/Milestone`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateMilestoneOptions = {
  mutationConfig?: MutationConfig<typeof createMilestone>;
};

export const useCreateMilestone = ({
  mutationConfig,
}: UseCreateMilestoneOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getMilestonesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createMilestone,
  });
};
