import { ReactNode } from "react";

interface PopperWrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: PopperWrapperProps) {
  return <div className="w-full bg-[#fff]">{children}</div>;
}

export default Wrapper;
