import type { ControllerRenderProps } from 'react-hook-form';
import { Range } from 'react-range';

import type { FilterFormValues } from '@/pages/ProductsView/types';

export const PriceRange = ({ value, ...rest }: ControllerRenderProps<FilterFormValues, 'price'>) => {
  return (
    <Range
      {...rest}
      step={1}
      min={0}
      max={100}
      values={value}
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
            <span className="absolute top-5 whitespace-nowrap">
              {props.key === 0 ? `${value[0]} PLN` : `${value[1]} PLN`}
            </span>
          </div>
        );
      }}
    />
  );
};
