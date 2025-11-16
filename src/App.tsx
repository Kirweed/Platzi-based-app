import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAuth } from '@/auth';
import { AuthenticatedRouter } from '@/navigation/AuthenticatedRouter';
import { UnauthenticatedRouter } from '@/navigation/UnauthenticatedRouter';
import { ErrorBoundry } from '@/common/components/ErrorBoundry';

const queryClient = new QueryClient();

export const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading session…</div>;
  return (
    <ErrorBoundry fallback={<h1>error occured</h1>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{user ? <AuthenticatedRouter /> : <UnauthenticatedRouter />}</BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundry>
  );
};
