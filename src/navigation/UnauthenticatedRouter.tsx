import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginView, RegisterView } from '@/pages';

import { routes } from './routes';

export const UnauthenticatedRouter = () => (
  <Routes>
    <Route path={routes.login} element={<LoginView />} />
    <Route path={routes.register} element={<RegisterView />} />
    <Route path="*" element={<Navigate to={routes.login} />} />
  </Routes>
);
