import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Banner } from "@/types/api";
import { getBannerQueryOptions } from "./get-banner";

export const updateBannerInputSchema = z.object({
  status: z.boolean(),
  image: z.any().nullable(),
});
export type UpdateBannerInput = z.infer<typeof updateBannerInputSchema>;

export const updateBanner = async ({
  data,
  id,
}: {
  data: UpdateBannerInput;
  id: number;
}): Promise<Banner> => {
  try {
    console.log("Updating Banner with Data:", data); // Log the data
    const response = await api.put(`/banner/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Banner:", error);
    throw error;
  }
};

type UseUpdateBannerOptions = {
  mutationConfig?: MutationConfig<typeof updateBanner>;
};

export const useUpdateBanner = ({
  mutationConfig,
}: UseUpdateBannerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getBannerQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateBanner,
  });
};
