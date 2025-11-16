import { useReducer } from 'react';

import type { FiltersAction, FiltersState, Price } from '@/pages/ProductsView/types';

const reducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case 'SET_PRICE':
      return { ...state, price: action.payload };

    case 'SET_CATEGORY':
      return { ...state, slug: action.payload };

    case 'SET_TITLE':
      return { ...state, title: action.payload };

    case 'RESET':
      return initialState;

    default:
      throw new Error('Unknown action type');
  }
};

const initialState: FiltersState = {
  price: {
    min: 0,
    max: 100,
  },
  slug: null,
  title: '',
};

export const useFilters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    setPrice: (price: Price) => dispatch({ type: 'SET_PRICE', payload: price }),
    setCategory: (slug: string | null) => dispatch({ type: 'SET_CATEGORY', payload: slug }),
    setTitle: (t: string) => dispatch({ type: 'SET_TITLE', payload: t }),
    reset: () => dispatch({ type: 'RESET' }),
  };
};
