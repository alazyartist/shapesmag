import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const AthletesPage = () => {
  const { data: athletes } = api.athletes.getAll.useQuery();
  return (
    <div className="space-y-2 text-xl text-zinc-300">
      <div>Athlete&apos;s</div>
      {athletes?.map((athlete) => {
        return (
          <Link
            href={`/athletes/${athlete.athlete_id}`}
            key={athlete.name}
            className="flex gap-4 rounded-md bg-zinc-300 bg-opacity-40 p-1"
          >
            <div>{athlete.name}</div>
            <div>{athlete.insta}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default AthletesPage;
