import { useNavigate } from 'react-router-dom';

import type { Product as ProductType } from '@/types';

export const Product = ({ images, price, title, id }: ProductType) => {
  const navigate = useNavigate();
  return (
    <>
      <li className="flex flex-col max-w-80" onClick={() => navigate(`/products/${id}`)}>
        <img src={images[0]} />
        <div className="min-h-12 flex justify-between items-center">
          <p className="max-w-3/4">{title}</p>
          <p>{price} PLN</p>
        </div>
      </li>
    </>
  );
};
