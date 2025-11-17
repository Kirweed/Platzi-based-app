import { useQuery } from '@tanstack/react-query';

import api from '@/api';
import type { Category } from '@/types';

export const useCategories = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<Category[]>('/categories?limit=0').then((res) => res.data),
  });

  return { categories: data, error, isPending };
};
