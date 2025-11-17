import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useMutation } from '@tanstack/react-query';

import api from '@/api';
import { Form } from '@/common/components';
import { useCategories } from '@/common/hooks';
import type { Option } from '@/types';
import type { ProductDTO } from '@/DTOs';

interface ProductForm {
  title: string;
  price: number;
  description: string;
  categoryId: Option;
  images: string[];
}

export const NewProductView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductForm>();
  const { mutate, isPending, data, error } = useMutation<ProductDTO, Error, ProductDTO>({
    mutationFn: (data) =>
      api.post('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
  });
  const { categories, isPending: isPendingCategories } = useCategories();

  const onSubmit = ({ title, price, description, categoryId, images }: ProductForm) => {
    mutate(
      {
        title,
        price,
        description,
        categoryId: Number(categoryId.value),
        images,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  if (isPendingCategories) return <p>Loading...</p>;

  return (
    <Form title="Add New Product" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input {...register('title', { required: true })} className="w-full p-2 border rounded-xl" />
        {errors.title && <p className="text-red-600 text-sm">Required</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          {...register('price', { required: true, valueAsNumber: true })}
          className="w-full p-2 border rounded-xl"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea {...register('description', { required: true })} className="w-full p-2 border rounded-xl" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <Controller
          control={control}
          name="categoryId"
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <Select {...field} options={categories?.map(({ id, name }) => ({ label: name, value: String(id) }))} />
          )}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input {...register('images', { required: true })} className="w-full p-2 border rounded-xl" />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Product'}
      </button>
      {data && <pre className="mt-4 p-3 bg-gray-100 rounded-xl text-sm">{JSON.stringify(data, null, 2)}</pre>}

      {error && <p className="text-red-600 mt-3">Failed to create product</p>}
    </Form>
  );
};
