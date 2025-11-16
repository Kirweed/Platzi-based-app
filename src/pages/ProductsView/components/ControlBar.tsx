import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';

import { Filters } from '@/pages/ProductsView/components/Filters';

export const ControlBar = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full justify-center gap-10 items-center">
      <div className="w-1/6 relative">
        <input ref={searchRef} type="search" className="w-full pl-10 rounded-2xl" />
        <button
          className="absolute top-1/2 -translate-y-1/2 left-4 bg-inherit border-none w-fit h-fit p-0 cursor-text focus-visible:border-none"
          onClick={() => searchRef.current?.focus()}
        >
          <FaSearch />
        </button>
      </div>
      <button className="flex gap-5 bg-inherit w-fit h-fit p-0 border-none" onClick={() => setIsOpen((prev) => !prev)}>
        <IoFilterSharp size={28} />
      </button>
      <Filters open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};
