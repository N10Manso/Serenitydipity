import type { PropsWithChildren, HTMLAttributes } from 'react';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, children, ...props }: CardProps): JSX.Element {
  return (
    <div
      className={`rounded-md border border-gray-200 bg-white p-4 shadow-sm ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: PropsWithChildren): JSX.Element {
  return <div className="mb-2 text-sm font-medium text-gray-700">{children}</div>;
}

export function CardContent({ children }: PropsWithChildren): JSX.Element {
  return <div className="text-sm text-gray-800">{children}</div>;
}

