import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { Discussion, Meta } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getHomes = (
  page = 1
): Promise<{
  data: Discussion[];
  meta: Meta;
}> => {
  return api.get(`/products`, {
    params: {
      page,
    },
  });
};

export const getHomesQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ["homes", { page }] : ["homes"],
    queryFn: () => getHomes(page),
  });
};

type UseDiscussionsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getHomesQueryOptions>;
};

export const useHomes = ({ queryConfig, page }: UseDiscussionsOptions) => {
  return useQuery({
    ...getHomesQueryOptions({ page }),
    ...queryConfig,
  });
};
