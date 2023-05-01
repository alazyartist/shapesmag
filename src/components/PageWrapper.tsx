import React from "react";
import HeaderMenu from "./HeaderMenu";
import { UserButton } from "@clerk/nextjs";
type WrapperProps = {
  children: React.ReactNode;
};
const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <main className="no-scrollbar flex min-h-screen flex-col items-center  overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-800">
      <div className="absolute right-4 top-4">
        <UserButton />
      </div>
      <HeaderMenu />
      <div className="no-scrollbar mt-24 flex h-[90vh] w-[95vw] flex-col place-content-center place-items-center overflow-y-scroll ">
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;
