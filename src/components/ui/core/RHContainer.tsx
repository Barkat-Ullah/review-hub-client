import React, { ReactNode } from "react";

interface RHContainerProps {
  children: ReactNode;
  className?: string;
}

const RHContainer = ({ children, className = "" }: RHContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default RHContainer;
