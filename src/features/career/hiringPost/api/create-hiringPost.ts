import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { HiringPost } from "@/types/api";
import { getHiringPostsQueryOptions } from "./get-hiringPosts";

export const createHiringPostInputSchema = z.object({
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

export type CreateHiringPostInput = z.infer<typeof createHiringPostInputSchema>;

export const createHiringPost = ({
  data,
}: {
  data: CreateHiringPostInput;
}): Promise<HiringPost> => {
  return api.post(`/hiringpost`, data, {});
};

type UseCreateHiringPostOptions = {
  mutationConfig?: MutationConfig<typeof createHiringPost>;
};

export const useCreateHiringPost = ({
  mutationConfig,
}: UseCreateHiringPostOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getHiringPostsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createHiringPost,
  });
};
