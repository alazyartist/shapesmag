import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const AthletesPage = () => {
  const { data: athletes } = api.athletes.getAll.useQuery();
  return (
    <div className="minimalistScroll flex h-full w-full flex-col place-content-start place-items-center overflow-y-scroll">
      <div className="pb-2 text-3xl font-bold text-zinc-800">
        Athlete&apos;s
      </div>
      <div className="grid w-fit gap-2 p-2 text-xl text-zinc-800 md:grid-cols-3">
        {athletes?.map((athlete) => {
          return (
            <Link
              href={`/athletes/${athlete.athlete_id}`}
              key={athlete.name}
              className="flex justify-between gap-4 rounded-md bg-zinc-800 bg-opacity-70 p-1 text-zinc-200"
            >
              <div>{athlete.name}</div>
              <div>{athlete.insta}</div>
              <div>{athlete.battles?.length}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AthletesPage;
