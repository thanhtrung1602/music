import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="w-full bg-[#fff]">{children}</div>;
}

export default Wrapper;
