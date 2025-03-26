import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { HiringPost } from "@/types/api";
import { getHiringPostsQueryOptions } from "./get-hiringPosts";

export const createHiringPostInputSchema = z.object({
  status: z.boolean(),
  name: z.string().min(1, "required"),
});

export type CreateHiringPostInput = z.infer<typeof createHiringPostInputSchema>;

export const createHiringPost = ({
  data,
}: {
  data: CreateHiringPostInput;
}): Promise<HiringPost> => {
  return api.post(`/hiringpost`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
