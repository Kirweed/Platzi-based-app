import { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import api from '@/api';
import { useAuth } from '@/auth/context';
import { Product } from '@/pages/ProductsView/components';
import { type Product as ProductType } from '@/types';

export const ProductsView = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(0);
  const { user, logout } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ['products', page],
    queryFn: () => api.get<ProductType[]>(`/products?limit=20&offset=${page * 10}`).then((res) => res.data),
  });

  console.log(error);

  return (
    <div>
      <div className="flex justify-between bg-blue p-1">
        <p className="text-2xl">Welcome, {user?.name || user?.email}!</p>
        <button onClick={logout}>Logout</button>
      </div>
      {isPending ? (
        <h1>loading...</h1>
      ) : (
        <div className="w-full flex flex-col gap-10 p-5 items-center">
          <div className="w-1/6 relative">
            <input ref={searchRef} type="search" className="w-full pl-10 rounded-2xl" />
            <button
              className="absolute top-1/2 -translate-y-1/2 left-4 bg-inherit border-none w-fit h-fit p-0 cursor-text focus-visible:border-none"
              onClick={() => searchRef.current?.focus()}
            >
              <FaSearch />
            </button>
          </div>
          <ul className="flex flex-wrap gap-8 justify-center">
            {data?.map((item) => (
              <Product key={item.id} {...item} />
            ))}
          </ul>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<MdNavigateNext size={40} />}
            onPageChange={({ selected }) => setPage(selected)}
            pageRangeDisplayed={3}
            pageCount={5}
            previousLabel={<MdNavigateBefore size={40} />}
            disabledClassName="text-gray-600 hover:text-gray-600"
            renderOnZeroPageCount={null}
            containerClassName="flex gap-10 text-xl p-10 items-center"
            activeClassName="text-blue font-bold text-2xl"
            pageLinkClassName="no-underline"
            breakLinkClassName="no-underline"
          />
        </div>
      )}
    </div>
  );
};
