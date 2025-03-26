import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getJobTypes = () => {
  return api.get(`/jobtype`);
};

export const getJobTypesQueryOptions = () => {
  return queryOptions({
    queryKey: ["JobTypes"],
    queryFn: () => getJobTypes(),
  });
};

type UseJobTypesOptions = {
  queryConfig?: QueryConfig<typeof getJobTypesQueryOptions>;
};

export const useJobTypes = ({ queryConfig }: UseJobTypesOptions) => {
  return useQuery({
    ...getJobTypesQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
