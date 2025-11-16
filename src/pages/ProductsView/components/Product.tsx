import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import type { Product as ProductType } from '@/types';

export const Product = ({ images, price, title }: ProductType) => {
  const [isGalleryOpen, setIsGallerOpen] = useState(false);

  return (
    <>
      <li className="flex flex-col max-w-80" onClick={() => setIsGallerOpen(true)}>
        <img src={images[0]} />
        <div className="min-h-12 flex justify-between items-center">
          <p className="max-w-3/4">{title}</p>
          <p>{price} PLN</p>
        </div>
      </li>
      {isGalleryOpen && (
        <>
          <div className="fixed bg-black opacity-80 w-screen h-screen top-0" />
          <div className="fixed w-screen top-0">
            <div className="scale-90">
              <ImageGallery
                showPlayButton={false}
                items={images.map((img) => ({ thumbnail: img, original: img }))}
                onClick={() => setIsGallerOpen(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
