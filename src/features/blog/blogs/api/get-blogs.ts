import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getBlogs = () => {
  return api.get(`/blogs`);
};

export const getBlogsQueryOptions = () => {
  return queryOptions({
    queryKey: ["Blogs"],
    queryFn: () => getBlogs(),
  });
};

type UseBlogsOptions = {
  queryConfig?: QueryConfig<typeof getBlogsQueryOptions>;
};

export const useBlogs = ({ queryConfig }: UseBlogsOptions) => {
  return useQuery({
    ...getBlogsQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
