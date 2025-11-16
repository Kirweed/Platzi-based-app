import { Range } from 'react-range';

import type { Price } from '@/pages/ProductsView/types';

interface PriceRangeProps {
  min: number;
  max: number;
  setPrice: (price: Price) => void;
}

export const PriceRange = ({ min, max, setPrice }: PriceRangeProps) => {
  console.log(min, max);
  return (
    <Range
      step={1}
      min={0}
      max={100}
      values={[min, max]}
      onChange={(values) => setPrice({ min: values[0], max: values[1] })}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '6px',
            width: '80%',
            backgroundColor: 'var(--color-white)',
            borderRadius: '1rem',
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => {
        console.log(props.key);
        return (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: 'var(--color-blue)',
              borderRadius: '50%',
            }}
          >
            <span className="absolute top-5 whitespace-nowrap">{props.key === 0 ? `${min} PLN` : `${max} PLN`}</span>
          </div>
        );
      }}
    />
  );
};
