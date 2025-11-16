import type { Product } from '@/types';

export interface ProductsContextType {
  setPage: (page: number) => void;
  isPending: boolean;
  error: Error | null;
  data?: Product[];
  filters: FiltersState;
  setPrice: (price: Price) => void;
  setCategory: (slug: string | null) => void;
  setTitle: (t: string) => void;
  reset: () => void;
}

export interface Price {
  min: number;
  max: number;
}

export interface FiltersState {
  price: Price;
  slug: string | null;
  title: string;
}

export type FiltersAction =
  | { type: 'SET_PRICE'; payload: Price }
  | { type: 'SET_CATEGORY'; payload: string | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'RESET' };
