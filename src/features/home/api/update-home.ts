import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Home } from "@/types/api";
import { getHomeQueryOptions } from "./get-home";

export const updateHomeInputSchema = z.object({
  header: z.string().min(1, "Required"),
  label: z.string().min(1, "Required"),
  sectionType: z.string(),
  description: z.string().min(1, "Required"),
  status: z.boolean(),
  image: z.any().nullable(),
  // imagePreview: z.string(),
});
export type UpdateHomeInput = z.infer<typeof updateHomeInputSchema>;

// export const updateHome = ({
//   data,
//   homeSection,
// }: {
//   data: UpdateHomeInput;
//   homeSection: string;
// }): Promise<Home> => {
//   return api.put(`/homepage/${homeSection}`, data);
// };
export const updateHome = async ({
  data,
  homeSection,
}: {
  data: UpdateHomeInput;
  homeSection: string;
}): Promise<Home> => {
  try {
    console.log("Updating Home with Data:", data); // Log the data
    const response = await api.put(`/homepage/${homeSection}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating home:", error);
    throw error;
  }
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
        queryKey: getHomeQueryOptions(data.sectionType).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateHome,
  });
};
