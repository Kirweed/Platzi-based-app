import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ProductsProvider } from '@/pages/ProductsView/ProductsProvider';

import { routes } from './routes';

const ProductsView = lazy(() => import('@/pages/ProductsView').then((module) => ({ default: module.ProductsView })));
const NewProductView = lazy(() =>
  import('@/pages/NewProductView').then((module) => ({ default: module.NewProductView })),
);
const EmptyView = lazy(() => import('@/pages/EmptyView').then((module) => ({ default: module.EmptyView })));

export const AuthenticatedRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={routes.products} />} />
    <Route path={routes.products}>
      <Route
        index
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsProvider>
              <ProductsView />
            </ProductsProvider>
          </Suspense>
        }
      />
      <Route
        path={routes.new}
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NewProductView />
          </Suspense>
        }
      />
      <Route path={routes.product}>
        <Route path={routes.edit} element={<></>} />
      </Route>
    </Route>
    <Route
      path="*"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <EmptyView />
        </Suspense>
      }
    />
  </Routes>
);
