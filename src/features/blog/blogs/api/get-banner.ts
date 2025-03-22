/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Banner } from "@/types/api";

export const getBanner = ({
  id,
}: {
  id: number;
}): Promise<{ data: Banner }> => {
  return api.get(`/banner/${id}`);
};

export const getBannerQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["banners", id],
    queryFn: () => getBanner({ id }),
  });
};

type UseBannerOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getBannerQueryOptions>;
};

export const useBanner = ({ id, queryConfig }: UseBannerOptions) => {
  return useQuery({
    ...getBannerQueryOptions(id),
    ...queryConfig,
  });
};
