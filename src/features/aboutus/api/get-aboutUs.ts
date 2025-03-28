/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { AboutUs } from "@/types/api";

export const getAboutUs = ({
  AboutUsSection,
}: {
  AboutUsSection: string;
}): Promise<{ data: AboutUs }> => {
  return api.get(`/abouts/${AboutUsSection}`);
};

export const getAboutUsQueryOptions = (AboutUsSection: string) => {
  return queryOptions({
    queryKey: ["AboutUss", AboutUsSection],
    queryFn: () => getAboutUs({ AboutUsSection }),
  });
};

type UseAboutUsOptions = {
  AboutUsSection: string;
  queryConfig?: QueryConfig<typeof getAboutUsQueryOptions>;
};

export const useAboutUs = ({
  AboutUsSection,
  queryConfig,
}: UseAboutUsOptions) => {
  return useQuery({
    ...getAboutUsQueryOptions(AboutUsSection),
    ...queryConfig,
  });
};
