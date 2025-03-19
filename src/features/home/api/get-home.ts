/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export const getHome = ({
  homeId,
}: {
  homeId: string;
}): Promise<{ data: any }> => {
  return api.get(`/products/${homeId}`);
};

export const getHomeQueryOptions = (homeId: string) => {
  return queryOptions({
    queryKey: ["homes", homeId],
    queryFn: () => getHome({ homeId }),
  });
};

type UseHomeOptions = {
  homeId: string;
  queryConfig?: QueryConfig<typeof getHomeQueryOptions>;
};

export const useHome = ({ homeId, queryConfig }: UseHomeOptions) => {
  return useQuery({
    ...getHomeQueryOptions(homeId),
    ...queryConfig,
  });
};
