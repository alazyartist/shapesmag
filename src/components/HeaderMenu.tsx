import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import useIsAdmin from "~/hooks/useIsAdmin";

const HeaderMenu = () => {
  const user = useUser();
  const isAdmin = useIsAdmin(user);
  return (
    <div className="maw-w-screen fixed top-4 flex flex-wrap place-items-center justify-around gap-2 text-zinc-900">
      <MenuLink href={"/"}>Home</MenuLink>
      <MenuLink href={"https://www.shapesmag.com"}>Shop</MenuLink>
      <MenuLink href={"/battlestats"}>BattleStats</MenuLink>
      <MenuLink href={"/athletes"}>Athletes</MenuLink>
      {isAdmin && <MenuLink href={"/admin"}>Admin</MenuLink>}
    </div>
  );
};

export default HeaderMenu;

const MenuLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="p-2 text-lg font-light text-zinc-300 underline underline-offset-4"
    >
      {children}
    </Link>
  );
};
