import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { HiringPost } from "@/types/api";
import { getHiringPostQueryOptions } from "./get-hiringPost";

export const updateHiringPostInputSchema = z.object({
  position: z.string().default(""),
  jobClose: z.string(),
  description: z.string().default(""),
  requirement: z.string().default(""),
  responsibility: z.string().default(""),
  benefit: z.string().default(""),
  status: z.boolean().default(false),
  categoryId: z.number(),
  relatedFieldId: z.number(),
  regionId: z.number(),
  jobTypeId: z.number(),
  locationId: z.number(),
});

export type UpdateHiringPostInput = z.infer<typeof updateHiringPostInputSchema>;

export const updateHiringPost = async ({
  data,
  id,
}: {
  data: UpdateHiringPostInput;
  id: number;
}): Promise<HiringPost> => {
  try {
    const response = await api.put(`/hiringpost/${id}`, data, {});
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating HiringPost:", error);
    throw error;
  }
};

type UseUpdateHiringPostOptions = {
  mutationConfig?: MutationConfig<typeof updateHiringPost>;
};

export const useUpdateHiringPost = ({
  mutationConfig,
}: UseUpdateHiringPostOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getHiringPostQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateHiringPost,
  });
};
