import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getHiringPosts = () => {
  return api.get(`/hiringpost`);
};

export const getHiringPostsQueryOptions = () => {
  return queryOptions({
    queryKey: ["HiringPosts"],
    queryFn: () => getHiringPosts(),
  });
};

type UseHiringPostsOptions = {
  queryConfig?: QueryConfig<typeof getHiringPostsQueryOptions>;
};

export const useHiringPosts = ({ queryConfig }: UseHiringPostsOptions) => {
  return useQuery({
    ...getHiringPostsQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
