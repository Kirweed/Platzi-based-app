import Select, { type ActionMeta, type StylesConfig } from 'react-select';

import type { Option } from '@/types';

interface SelectProps {
  options: Option[];
  name: string;
  onChange?: (selectedOption: Option | null, actionMeta: ActionMeta<Option>) => void;
  label?: string;
  disabled?: boolean;
  defaultValue?: Option;
  placeholder?: string;
}

const selectStyles: StylesConfig<Option> = {
  control: (provided, state) => ({
    ...provided,
    padding: '9px 12px',
    backgroundColor: 'var(--color-dark-secondary)',
    borderRadius: '1rem',
    boxShadow: 'none',
    fontSize: '1rem',
    opacity: state.isDisabled ? 0.5 : 1,
    cursor: 'pointer',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--color-white)',
    marginLeft: 0,
  }),
  input: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-dark-secondary)',
    margin: 0,
    borderRadius: '0 0 4px 4px',
    zIndex: 1000,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--color-blue)' : 'var(--color-dark-secondary)',
    ':hover': {
      backgroundColor: 'var(--color-blue)',
    },
    ':active': {
      backgroundColor: 'var(--color-blue)',
    },
    color: 'var(--color-white)',
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--color-white)',
    whiteSpace: 'nowrap',
  }),
};

export const SelectInput = ({ ...props }: SelectProps) => <Select<Option> {...props} styles={selectStyles} />;
