/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Milestone } from "@/types/api";

export const getMilestone = ({
  id,
}: {
  id: number;
}): Promise<{ data: Milestone }> => {
  return api.get(`/milestones/${id}`);
};

export const getMilestoneQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["Milestones", id],
    queryFn: () => getMilestone({ id }),
  });
};

type UseMilestoneOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getMilestoneQueryOptions>;
};

export const useMilestone = ({ id, queryConfig }: UseMilestoneOptions) => {
  return useQuery({
    ...getMilestoneQueryOptions(id),
    ...queryConfig,
  });
};
