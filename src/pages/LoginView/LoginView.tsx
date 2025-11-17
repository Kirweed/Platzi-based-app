import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/auth';
import { Form } from '@/common/components';
import { routes } from '@/navigation/routes';

interface LoginValues {
  email: string;
  password: string;
}

export const LoginView = () => {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({ defaultValues: { email: '', password: '' }, mode: 'onBlur' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }): Promise<void> => {
    setLoading(true);
    try {
      await login({ email, password });
    } catch {
      setError('password', { message: 'Invalid email or password' });
    } finally {
      setLoading(false);
      navigate(routes.products);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Sign in"
      link={{ route: routes.register, text: 'Go to create user' }}
    >
      <input
        type="email"
        placeholder="email"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
        })}
      />
      {errors.email && <div className="text-red-600 mb-3">{errors.email.message}</div>}

      <input
        type="password"
        placeholder="password"
        required
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <div className="text-red-600">{errors.password.message}</div>}

      <button type="submit" className="w-full py-2 rounded bg-blue text-white disabled:opacity-50" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </Form>
  );
};
