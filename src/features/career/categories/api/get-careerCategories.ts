import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getCareerCategories = () => {
  return api.get(`/CareerCategory`);
};

export const getCareerCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["CareerCategories"],
    queryFn: () => getCareerCategories(),
  });
};

type UseCareerCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCareerCategoriesQueryOptions>;
};

export const useCareerCategories = ({
  queryConfig,
}: UseCareerCategoriesOptions) => {
  return useQuery({
    ...getCareerCategoriesQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
