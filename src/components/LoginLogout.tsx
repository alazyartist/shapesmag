import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import useIsAdmin from "~/hooks/useIsAdmin";
const LoginLogout = () => {
  const isAdmin = useIsAdmin();
  return (
    <div className="flex gap-4">
      {isAdmin && (
        <div className="absolute bottom-3 left-[30vw] w-[40vw] text-center text-xl text-zinc-300">
          You&apos;re an Admin
        </div>
      )}
      <SignedOut>
        <ButtonWrapper>
          <SignInButton mode="modal">Login</SignInButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <SignUpButton mode="modal">Register</SignUpButton>
        </ButtonWrapper>
      </SignedOut>
      <SignedIn>
        <ButtonWrapper>
          <SignOutButton>Logout</SignOutButton>
        </ButtonWrapper>
      </SignedIn>
    </div>
  );
};

export default LoginLogout;

const ButtonWrapper = ({ children }) => {
  return (
    <div className="rounded-md bg-zinc-300 p-2 text-xl text-zinc-800">
      {children}
    </div>
  );
};
