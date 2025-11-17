import ReactPaginate from 'react-paginate';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { isEmpty } from 'lodash';

import { useAuth } from '@/auth/context';
import { ControlBar, Product } from '@/pages/ProductsView/components';
import { useProducts } from '@/pages/ProductsView/context';

export const ProductsView = () => {
  const { isPending, data, setPage } = useProducts();
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="flex justify-between bg-blue p-1">
        <p className="text-2xl">Welcome, {user?.name || user?.email}!</p>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="w-full flex flex-col gap-10 p-5 items-center">
        <ControlBar />
        {isPending ? (
          <h1>loading...</h1>
        ) : isEmpty(data) ? (
          <h3 className="text-3xl my-20">No products matching your filters or search</h3>
        ) : (
          <ul className="flex flex-wrap gap-8 justify-center">
            {data?.map((item) => (
              <Product key={item.id} {...item} />
            ))}
          </ul>
        )}
        <ReactPaginate
          breakLabel="..."
          nextLabel={<MdNavigateNext size={40} />}
          onPageChange={({ selected }) => {
            console.log(selected);
            setPage(selected);
          }}
          pageRangeDisplayed={3}
          pageCount={5}
          previousLabel={<MdNavigateBefore size={40} />}
          disabledClassName="text-gray-600 hover:text-gray-600"
          containerClassName="flex gap-10 text-xl p-10 items-center"
          activeClassName="text-blue font-bold text-2xl"
          pageLinkClassName="no-underline"
          breakLinkClassName="no-underline"
        />
      </div>
    </div>
  );
};
