import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getLocations = () => {
  return api.get(`/location`);
};

export const getLocationsQueryOptions = () => {
  return queryOptions({
    queryKey: ["Locations"],
    queryFn: () => getLocations(),
  });
};

type UseLocationsOptions = {
  queryConfig?: QueryConfig<typeof getLocationsQueryOptions>;
};

export const useLocations = ({ queryConfig }: UseLocationsOptions) => {
  return useQuery({
    ...getLocationsQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
