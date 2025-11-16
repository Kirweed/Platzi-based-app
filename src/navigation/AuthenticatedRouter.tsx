import { Navigate, Route, Routes } from 'react-router-dom';

import { ProductsView } from '@/pages';

import { routes } from './routes';

export const AuthenticatedRouter = () => (
  <Routes>
    <Route path={routes.products} element={<ProductsView />} />
    <Route path="*" element={<Navigate to={routes.products} />} />
  </Routes>
);
