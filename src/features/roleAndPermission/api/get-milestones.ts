import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { QueryConfig } from "@/lib/react-query";

export const getMilestones = () => {
  return api.get(`/milestones`);
};

export const getMilestonesQueryOptions = () => {
  return queryOptions({
    queryKey: ["Milestones"],
    queryFn: () => getMilestones(),
  });
};

type UseMilestonesOptions = {
  queryConfig?: QueryConfig<typeof getMilestonesQueryOptions>;
};

export const useMilestones = ({ queryConfig }: UseMilestonesOptions) => {
  return useQuery({
    ...getMilestonesQueryOptions(),
    staleTime: 0, // Ensures data is always considered "stale" and refetched
    refetchOnMount: true, // Refetches when the component mounts
    refetchOnWindowFocus: false,
    ...queryConfig,
  });
};
