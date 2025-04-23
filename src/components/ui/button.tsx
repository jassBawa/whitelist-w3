import React, { ReactNode } from 'react';

const Button = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return <button className={className}>{children}</button>;
};

export default Button;
