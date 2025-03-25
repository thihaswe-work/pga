import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getRegions = () => {
  return api.get(`/CareerCategory`);
};

export const getRegionsQueryOptions = () => {
  return queryOptions({
    queryKey: ["Regions"],
    queryFn: () => getRegions(),
  });
};

type UseRegionsOptions = {
  queryConfig?: QueryConfig<typeof getRegionsQueryOptions>;
};

export const useRegions = ({ queryConfig }: UseRegionsOptions) => {
  return useQuery({
    ...getRegionsQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
