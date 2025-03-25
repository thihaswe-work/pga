/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { RelatedField } from "@/types/api";

export const getRelatedField = ({
  id,
}: {
  id: number;
}): Promise<{ data: RelatedField }> => {
  return api.get(`/RelatedField/${id}`);
};

export const getRelatedFieldQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["RelatedFields", id],
    queryFn: () => getRelatedField({ id }),
  });
};

type UseRelatedFieldOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getRelatedFieldQueryOptions>;
};

export const useRelatedField = ({
  id,
  queryConfig,
}: UseRelatedFieldOptions) => {
  return useQuery({
    ...getRelatedFieldQueryOptions(id),
    ...queryConfig,
  });
};
