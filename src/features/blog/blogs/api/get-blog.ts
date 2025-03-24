/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Blog } from "@/types/api";

export const getBlog = ({ id }: { id: number }): Promise<{ data: Blog }> => {
  return api.get(`/blogs/${id}`);
};

export const getBlogQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["Blogs", id],
    queryFn: () => getBlog({ id }),
  });
};

type UseBlogOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getBlogQueryOptions>;
};

export const useBlog = ({ id, queryConfig }: UseBlogOptions) => {
  return useQuery({
    ...getBlogQueryOptions(id),
    ...queryConfig,
  });
};
