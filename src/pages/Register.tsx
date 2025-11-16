import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@/auth';
import type { CreateUserDto } from '@/auth/types';
import { routes } from '@/routes';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<CreateUserDto>({ defaultValues: { name: '', email: '', password: '' } });
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateUserDto> = async (values) => {
    setLoading(true);
    try {
      await createUser(values);
      navigate(routes.products);
    } catch {
      setError('password', { message: 'Invalid data, try again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-4">
      <input placeholder="Name" {...register('name')} className="w-full p-2 border rounded" />
      {errors.name && <div className="text-red-600 mb-3">{errors.name.message}</div>}

      <input placeholder="Email" type="email" {...register('email')} className="w-full p-2 border rounded" />
      {errors.email && <div className="text-red-600 mb-3">{errors.email.message}</div>}

      <input placeholder="Password" type="password" {...register('password')} className="w-full p-2 border rounded" />
      {errors.password && <div className="text-red-600 mb-3">{errors.password.message}</div>}

      <button className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
        {loading ? 'loading...' : 'Create Account'}
      </button>
    </form>
  );
}
