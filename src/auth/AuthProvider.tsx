import Cookies from 'js-cookie';
import { useState, useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/api.ts';
import type { User } from '@/auth/types';
import { AuthContext } from '@/auth/context';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tryRestore = async (): Promise<void> => {
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.post('/auth/refresh-token', { refresh_token: refreshToken });
        const { access_token } = res.data as { access_token: string };
        localStorage.setItem('access_token', access_token);
        api.defaults.headers.common.Authorization = 'Bearer ' + access_token;

        const profile = await api.get<User>('/auth/profile');
        setUser(profile.data);
      } catch {
        localStorage.removeItem('access_token');
        Cookies.remove('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    void tryRestore();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }): Promise<User> => {
    const res = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token } = res.data as { access_token: string; refresh_token: string };

    localStorage.setItem('access_token', access_token);
    Cookies.set('refresh_token', refresh_token, { expires: 7, sameSite: 'lax' });
    api.defaults.headers.common.Authorization = 'Bearer ' + access_token;

    const profile = await api.get<User>('/auth/profile');
    setUser(profile.data);
    return profile.data;
  };

  const logout = (): void => {
    localStorage.removeItem('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
    navigate('/login');
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};
