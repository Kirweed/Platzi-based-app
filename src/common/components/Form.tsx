import type { FormHTMLAttributes, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import type { routes } from '@/navigation/routes';

interface FormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
  title: string;
  link?: {
    text: string;
    route: (typeof routes)[keyof typeof routes];
  };
}

export const Form = ({ children, title, link, ...rest }: FormProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-8 m-auto mt-[50vh] bg-dark-secondary rounded-2xl -translate-y-1/2 max-w-md p-8 shadow ring-1">
      <h2 className="text-2xl">{title}</h2>
      <form className="w-full flex flex-col gap-4" {...rest}>
        {children}
      </form>
      {link && <a onClick={() => navigate(link.route)}>{link.text}</a>}
    </div>
  );
};
