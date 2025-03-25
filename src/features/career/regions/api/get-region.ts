/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Region } from "@/types/api";

export const getRegion = ({
  id,
}: {
  id: number;
}): Promise<{ data: Region }> => {
  return api.get(`/Region/${id}`);
};

export const getRegionQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["Regions", id],
    queryFn: () => getRegion({ id }),
  });
};

type UseRegionOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getRegionQueryOptions>;
};

export const useRegion = ({ id, queryConfig }: UseRegionOptions) => {
  return useQuery({
    ...getRegionQueryOptions(id),
    ...queryConfig,
  });
};
