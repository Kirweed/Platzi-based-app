import { Navigate, Route, Routes } from 'react-router-dom';

import { ProductsProvider } from '@/pages/ProductsView/ProductsProvider';
import { ProductsView } from '@/pages';

import { routes } from './routes';

export const AuthenticatedRouter = () => (
  <Routes>
    <Route
      path={routes.products}
      element={
        <ProductsProvider>
          <ProductsView />
        </ProductsProvider>
      }
    />
    <Route path="*" element={<Navigate to={routes.products} />} />
  </Routes>
);
