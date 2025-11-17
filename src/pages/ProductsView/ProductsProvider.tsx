import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';

import api from '@/api.ts';
import { ProductsContext } from '@/pages/ProductsView/context';
import { useFilters } from '@/pages/ProductsView/hooks/useFilters';
import type { Product } from '@/types';

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { state: filters, setCategory, setPrice, setTitle, reset } = useFilters();
  const { isPending, error, data } = useQuery({
    queryKey: ['products', page, filters, search],
    queryFn: () =>
      api
        .get<
          Product[]
        >(`/products?limit=10&offset=${page * 10}${filters.slug ? `&categorySlug=${filters.slug}` : ''}${filters.price ? `&price_min=${filters.price.min}&price_max=${filters.price.max}&title=${search}` : ''}`)
        .then((res) => res.data),
  });

  console.log(search);

  const onSearch = useMemo(
    () =>
      debounce((phrase: string) => {
        setSearch(phrase);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => onSearch.cancel();
  }, [onSearch]);

  return (
    <ProductsContext.Provider
      value={{ isPending, data, error, setPage, filters, setCategory, setPrice, setTitle, reset, onSearch }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
