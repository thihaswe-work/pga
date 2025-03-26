/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { HiringPost } from "@/types/api";

export const getHiringPost = ({
  id,
}: {
  id: number;
}): Promise<{ data: HiringPost }> => {
  return api.get(`/hiringpost/${id}`);
};

export const getHiringPostQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["HiringPosts", id],
    queryFn: () => getHiringPost({ id }),
  });
};

type UseHiringPostOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getHiringPostQueryOptions>;
};

export const useHiringPost = ({ id, queryConfig }: UseHiringPostOptions) => {
  return useQuery({
    ...getHiringPostQueryOptions(id),
    ...queryConfig,
  });
};
