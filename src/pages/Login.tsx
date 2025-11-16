import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@/auth';

interface LoginValues {
  email: string;
  password: string;
}

export const Login = () => {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({ defaultValues: { email: '', password: '' } });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }): Promise<void> => {
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('password', { message: err.message });
      } else {
        setError('password', { message: 'Login failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full m-auto mt-[50vh] -translate-y-1/2 max-w-md p-8 rounded shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl mb-6">Sign in</h2>

      <label className="block mb-2">
        <span className="text-sm">Email</span>
        <input type="email" required {...register('email')} className="mt-1 block w-full rounded border p-2" />
      </label>

      {errors.email && <div className="text-red-600 mb-3">{errors.email.message}</div>}

      <label className="block mb-4">
        <span className="text-sm">Password</span>
        <input type="password" required {...register('password')} className="mt-1 block w-full rounded border p-2" />
      </label>

      {errors.password && <div className="text-red-600 mb-3">{errors.password.message}</div>}

      <button
        type="submit"
        className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
};
