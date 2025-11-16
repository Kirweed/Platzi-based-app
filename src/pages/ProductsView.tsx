import { useAuth } from '@/auth/context';

export const ProductsView = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-xl">Welcome, {user?.name || user?.email}!</h1>
      <button onClick={logout} className="mt-4 px-3 py-2 rounded bg-red-500 text-white">
        Logout
      </button>
    </div>
  );
};
