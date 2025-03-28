import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getAboutUss = () => {
  return api.get(`/abouts`);
};

export const getAboutUssQueryOptions = () => {
  return queryOptions({
    queryKey: ["AboutUss"],
    queryFn: () => getAboutUss(),
  });
};

type UseAboutUssOptions = {
  queryConfig?: QueryConfig<typeof getAboutUssQueryOptions>;
};

export const useAboutUss = ({ queryConfig }: UseAboutUssOptions) => {
  return useQuery({
    ...getAboutUssQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
