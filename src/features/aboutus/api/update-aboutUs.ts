import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { AboutUs } from "@/types/api";
import { getAboutUsQueryOptions } from "./get-aboutUs";

export const updateAboutUsInputSchema = z.object({
  header: z.string().min(1, "Required"),
  label: z.string().min(1, "Required"),
  sectionType: z.string(),
  description: z.string().min(1, "Required"),
  status: z.boolean(),
  image: z.any().nullable(),
  // imagePreview: z.string(),
});
export type UpdateAboutUsInput = z.infer<typeof updateAboutUsInputSchema>;

export const updateAboutUs = async ({
  data,
  AboutUsSection,
}: {
  data: UpdateAboutUsInput;
  AboutUsSection: string;
}): Promise<AboutUs> => {
  try {
    console.log("Updating AboutUs with Data:", data); // Log the data
    const response = await api.put(`/abouts/${AboutUsSection}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating AboutUs:", error);
    throw error;
  }
};

type UseUpdateAboutUsOptions = {
  mutationConfig?: MutationConfig<typeof updateAboutUs>;
};

export const useUpdateAboutUs = ({
  mutationConfig,
}: UseUpdateAboutUsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getAboutUsQueryOptions(data.sectionType).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAboutUs,
  });
};
