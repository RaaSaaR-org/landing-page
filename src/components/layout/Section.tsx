import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'primary' | 'secondary' | 'primary-dark' | 'primary-gradient';
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-primary-50',
  secondary: 'bg-secondary-50',
  'primary-dark': 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900',
  'primary-gradient': 'bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900',
};

export function Section({ children, className = '', id, background = 'white' }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 lg:py-24 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
