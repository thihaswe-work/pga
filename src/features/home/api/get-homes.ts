import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getHomes = () => {
  return api.get(`/homepage`);
};

export const getHomesQueryOptions = () => {
  return queryOptions({
    queryKey: ["homes"],
    queryFn: () => getHomes(),
  });
};

type UseHomesOptions = {
  queryConfig?: QueryConfig<typeof getHomesQueryOptions>;
};

export const useHomes = ({ queryConfig }: UseHomesOptions) => {
  return useQuery({
    ...getHomesQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
