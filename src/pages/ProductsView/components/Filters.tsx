import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import { IoMdArrowRoundBack } from 'react-icons/io';

import api from '@/api';
import { PriceRange } from '@/pages/ProductsView/components/PriceRange';
import type { Category as CategoryType } from '@/types';
import { useProducts } from '@/pages/ProductsView/context';

interface FiltersProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Filters = ({ open, setOpen }: FiltersProps) => {
  const { filters, setPrice, setCategory } = useProducts();
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<CategoryType[]>('/categories?limit=0').then((res) => res.data),
  });
  return (
    <div
      className="fixed top-0 right-0 w-80 h-full bg-dark-secondary shadow-xl flex flex-col justify-between gap-12 transition-transform duration-300 p-10"
      style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
    >
      <div className="flex flex-col gap-10">
        <button onClick={() => setOpen(false)} className="bg-inherit w-fit h-fit p-0 border-none">
          <IoMdArrowRoundBack size={28} />
        </button>
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold">Filters:</h2>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-5 w-full">
              <p className="font-semibold">Price range</p>
              <PriceRange min={filters.price.min} max={filters.price.max} setPrice={setPrice} />
            </div>
            {data && (
              <Select
                options={data.map(({ name, slug }) => ({ label: name, value: slug }))}
                onChange={(option) => setCategory(option?.value ?? null)}
              />
            )}
          </div>
        </div>
      </div>
      <button>Apply</button>
    </div>
  );
};
