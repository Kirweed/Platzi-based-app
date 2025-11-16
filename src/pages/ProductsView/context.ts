import { createContext, useContext } from 'react';

import type { ProductsContextType } from '@/pages/ProductsView/types';

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = (): ProductsContextType => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};
