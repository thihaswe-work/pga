/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Home } from "@/types/api";

export const getHome = ({
  homeSection,
}: {
  homeSection: string;
}): Promise<{ data: Home }> => {
  return api.get(`/homepage/${homeSection}`);
};

export const getHomeQueryOptions = (homeSection: string) => {
  return queryOptions({
    queryKey: ["homes", homeSection],
    queryFn: () => getHome({ homeSection }),
  });
};

type UseHomeOptions = {
  homeSection: string;
  queryConfig?: QueryConfig<typeof getHomeQueryOptions>;
};

export const useHome = ({ homeSection, queryConfig }: UseHomeOptions) => {
  return useQuery({
    ...getHomeQueryOptions(homeSection),
    ...queryConfig,
  });
};
