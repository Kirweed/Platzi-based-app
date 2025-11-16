import { useState, type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '@/api.ts';
import { ProductsContext } from '@/pages/ProductsView/context';
import { useFilters } from '@/pages/ProductsView/hooks/useFilters';
import type { Product } from '@/types';

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [page, setPage] = useState(0);
  const { isPending, error, data } = useQuery({
    queryKey: ['products', page],
    queryFn: () => api.get<Product[]>(`/products?limit=10&offset=${page * 10}`).then((res) => res.data),
  });
  console.log(page);
  const { state: filters, setCategory, setPrice, setTitle, reset } = useFilters();

  return (
    <ProductsContext.Provider
      value={{ isPending, data, error, setPage, filters, setCategory, setPrice, setTitle, reset }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
