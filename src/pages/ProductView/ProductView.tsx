import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import api from '@/api';
import type { Product as ProductType } from '@/types';
import { Product } from '@/pages/ProductsView/components';

export const ProductView = () => {
  const { id } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ['product'],
    queryFn: () => api.get<ProductType>(`/products/${id}`).then((res) => res.data),
  });

  if (isPending) return <p>loading</p>;

  return <Product {...(data as ProductType)} />;
};
