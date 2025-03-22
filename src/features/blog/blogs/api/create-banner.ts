import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { Banner } from "@/types/api";
import { getBannersQueryOptions } from "./get-banners";

export const createBannerInputSchema = z.object({
  status: z.boolean(),
  image: z.any().nullable(),
});

export type CreateBannerInput = z.infer<typeof createBannerInputSchema>;

export const createBanner = ({
  data,
}: {
  data: CreateBannerInput;
}): Promise<Banner> => {
  return api.post(`/banner`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseCreateBannerOptions = {
  mutationConfig?: MutationConfig<typeof createBanner>;
};

export const useCreateBanner = ({
  mutationConfig,
}: UseCreateBannerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBannersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createBanner,
  });
};
