import Select from 'react-select';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { useCategories } from '@/common/hooks';
import { PriceRange } from '@/pages/ProductsView/components/PriceRange';
import { useProducts } from '@/pages/ProductsView/context';
import type { FilterFormValues } from '@/pages/ProductsView/types';

interface FiltersProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Filters = ({ open, setOpen }: FiltersProps) => {
  const { filters, setPrice, setCategory } = useProducts();
  const { handleSubmit, control } = useForm<FilterFormValues>({
    defaultValues: { slug: null, price: [filters.price.min, filters.price.max] },
  });
  const { categories } = useCategories();

  const onSubmit: SubmitHandler<FilterFormValues> = ({ slug, price: [min, max] }) => {
    setCategory(!slug?.value || slug.value === 'all' ? null : slug.value);
    setPrice({ min: min, max: max });
    setOpen(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-0 right-0 w-80 h-full bg-dark-secondary shadow-xl flex flex-col justify-between gap-12 transition-transform duration-300 p-10"
      style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
    >
      <div className="flex flex-col gap-10">
        <button type="button" onClick={() => setOpen(false)} className="bg-inherit w-fit h-fit p-0 border-none">
          <IoMdArrowRoundBack size={28} />
        </button>
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold">Filters:</h2>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-5 w-full">
              <p className="font-semibold">Price range</p>
              <Controller control={control} name="price" render={({ field }) => <PriceRange {...field} />} />
            </div>
            {categories && (
              <Controller
                control={control}
                name="slug"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: 'all', label: 'all' },
                      ...categories.map(({ name, slug }) => ({ label: name, value: slug })),
                    ]}
                  />
                )}
              />
            )}
          </div>
        </div>
      </div>
      <button type="submit">Apply</button>
    </form>
  );
};
