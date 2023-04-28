import React from "react";
import HeaderMenu from "./HeaderMenu";
type WrapperProps = {
  children: React.ReactNode;
};
const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center  overflow-hidden bg-gradient-to-b from-[#02246d] to-[#1d2056] text-zinc-300">
      <HeaderMenu />
      <div className="mt-24 flex h-[80vh] w-[95vw] flex-col place-content-center place-items-center overflow-y-scroll ">
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;
