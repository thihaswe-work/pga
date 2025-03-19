import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getHomes = () => {
  return api.get(`/products`);
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
    ...queryConfig,
  });
};
