import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '@/auth';
import { AuthenticatedRouter } from '@/navigation/AuthenticatedRouter';
import { UnauthenticatedRouter } from '@/navigation/UnauthenticatedRouter';

export const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading session…</div>;
  return <BrowserRouter>{user ? <AuthenticatedRouter /> : <UnauthenticatedRouter />}</BrowserRouter>;
};
