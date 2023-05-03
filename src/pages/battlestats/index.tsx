import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const battleStats = () => {
  const { data: events } = api.events.getAll.useQuery();
  if (!events) return <div>Loading Events...</div>;
  return (
    <div>
      <div className="text-xl text-zinc-800">Battle Stats</div>

      <div className="space-y-2 pt-2">
        {events.map((event) => {
          return (
            event.Battles.length > 0 && (
              <Link
                key={event.event_id}
                className="flex place-content-center place-items-center rounded-md bg-zinc-800 p-4 text-zinc-300"
                href={`/battlestats/${event.event_id}`}
              >
                <p className="text-center">{event.name}</p>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default battleStats;
