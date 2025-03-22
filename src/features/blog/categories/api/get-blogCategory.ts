/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { BlogCategory } from "@/types/api";

export const getBlogCategory = ({
  id,
}: {
  id: number;
}): Promise<{ data: BlogCategory }> => {
  return api.get(`/blogCategory/${id}`);
};

export const getBlogCategoryQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["blogCategorys", id],
    queryFn: () => getBlogCategory({ id }),
  });
};

type UseBlogCategoryOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getBlogCategoryQueryOptions>;
};

export const useBlogCategory = ({
  id,
  queryConfig,
}: UseBlogCategoryOptions) => {
  return useQuery({
    ...getBlogCategoryQueryOptions(id),
    ...queryConfig,
  });
};
