import React from "react";
import HeaderMenu from "./HeaderMenu";
type WrapperProps = {
  children: React.ReactNode;
};
const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#02246d] to-[#1d2056]">
      <HeaderMenu />
      {children}
    </main>
  );
};

export default PageWrapper;
