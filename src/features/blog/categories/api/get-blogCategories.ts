import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getBlogCategories = () => {
  return api.get(`/blogCategory`);
};

export const getBlogCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["blogCategories"],
    queryFn: () => getBlogCategories(),
  });
};

type UseBlogCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getBlogCategoriesQueryOptions>;
};

export const useBlogCategories = ({
  queryConfig,
}: UseBlogCategoriesOptions) => {
  return useQuery({
    ...getBlogCategoriesQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
