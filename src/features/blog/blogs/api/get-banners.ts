import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getBanners = () => {
  return api.get(`/banner`);
};

export const getBannersQueryOptions = () => {
  return queryOptions({
    queryKey: ["banners"],
    queryFn: () => getBanners(),
  });
};

type UseBannersOptions = {
  queryConfig?: QueryConfig<typeof getBannersQueryOptions>;
};

export const useBanners = ({ queryConfig }: UseBannersOptions) => {
  return useQuery({
    ...getBannersQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
