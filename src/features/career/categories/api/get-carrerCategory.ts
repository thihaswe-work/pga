import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { CareerCategory } from "@/types/api";

export const getCareerCategory = ({
  id,
}: {
  id: number;
}): Promise<{ data: CareerCategory }> => {
  return api.get(`/categories/${id}`);
};

export const getCareerCategoryQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["CareerCategorys", id],
    queryFn: () => getCareerCategory({ id }),
  });
};

type UseCareerCategoryOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getCareerCategoryQueryOptions>;
};

export const useCareerCategory = ({
  id,
  queryConfig,
}: UseCareerCategoryOptions) => {
  return useQuery({
    ...getCareerCategoryQueryOptions(id),
    ...queryConfig,
  });
};
