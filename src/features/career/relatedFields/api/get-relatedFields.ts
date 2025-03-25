import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getRelatedFields = () => {
  return api.get(`/CareerCategory`);
};

export const getRelatedFieldsQueryOptions = () => {
  return queryOptions({
    queryKey: ["RelatedFields"],
    queryFn: () => getRelatedFields(),
  });
};

type UseRelatedFieldsOptions = {
  queryConfig?: QueryConfig<typeof getRelatedFieldsQueryOptions>;
};

export const useRelatedFields = ({ queryConfig }: UseRelatedFieldsOptions) => {
  return useQuery({
    ...getRelatedFieldsQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
