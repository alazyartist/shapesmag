import Link from "next/link";
import React from "react";

const HeaderMenu = () => {
  return (
    <div className="fixed top-4 flex place-items-center justify-around gap-4">
      <Link className="rounded-md bg-zinc-300 p-2 text-2xl" href={"/"}>
        Home
      </Link>
      <Link
        className="rounded-md bg-zinc-300 p-2 text-2xl"
        href={"https://www.shapesmag.com"}
      >
        Shop
      </Link>
      <Link
        className="rounded-md bg-zinc-300 p-2 text-2xl"
        href={"/battlestats"}
      >
        BattleStats
      </Link>
      <Link className="rounded-md bg-zinc-300 p-2 text-2xl" href={"/athletes"}>
        Athletes
      </Link>
    </div>
  );
};

export default HeaderMenu;
