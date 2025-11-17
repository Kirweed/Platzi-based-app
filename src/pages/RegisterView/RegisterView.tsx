import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@/auth';
import type { CreateUserDto } from '@/auth/types';
import { routes } from '@/navigation/routes';
import { Form } from '@/common/components';

export const RegisterView = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<CreateUserDto>({
    defaultValues: { name: '', email: '', password: '', avatar: 'https://api.lorem.space/image/face?w=150&h=150' },
    mode: 'onBlur',
  });
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
    <Form onSubmit={handleSubmit(onSubmit)} title="Create user" link={{ route: '/login', text: 'Go to log in' }}>
      <input placeholder="Name" {...register('name', { required: 'Name is required' })} />
      {errors.name && <div className="text-red-600 mb-3">{errors.name.message}</div>}

      <input
        placeholder="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
        })}
      />
      {errors.email && <div className="text-red-600 mb-3">{errors.email.message}</div>}

      <input
        placeholder="Password"
        type="password"
        {...register('password', {
          required: 'Email is required',
          minLength: { value: 8, message: 'Password must contain at least 8 characters' },
        })}
      />
      {errors.password && <div className="text-red-600 mb-3">{errors.password.message}</div>}

      <button className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
        {loading ? 'loading...' : 'Create Account'}
      </button>
    </Form>
  );
};
