import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useIsAdmin from "~/hooks/useIsAdmin";

const HeaderMenu = () => {
  const router = useRouter();
  const isAdmin: boolean = useIsAdmin();
  return (
    <div className="maw-w-screen fixed top-2 flex h-fit flex-col place-items-center  text-zinc-900">
      {router.asPath !== "/" && (
        <Image
          src={"/shapeslogo.PNG"}
          alt={"shapeslogo"}
          width={100}
          height={35}
        />
      )}
      <div
        className="
      flex flex-wrap"
      >
        <MenuLink href={"/"}>Home</MenuLink>
        <MenuLink href={"https://shop.shapesmag.com"}>Shop</MenuLink>
        <MenuLink href={"/events"}>Events</MenuLink>
        <MenuLink href={"/battlestats"}>BattleStats</MenuLink>
        <MenuLink href={"/athletes"}>Athletes</MenuLink>
        {isAdmin && <MenuLink href={"/admin"}>Admin</MenuLink>}
      </div>
    </div>
  );
};

export default HeaderMenu;

const MenuLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="p-2 text-lg font-light text-zinc-900 underline underline-offset-4"
    >
      {children}
    </Link>
  );
};
