import { useAuth } from '@/auth';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between bg-blue p-1">
      <p className="text-2xl">Welcome, {user?.name || user?.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
