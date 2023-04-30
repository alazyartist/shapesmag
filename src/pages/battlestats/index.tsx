import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const battleStats = () => {
  const { data: events } = api.events.getAll.useQuery();
  if (!events) return <div>Loading Events...</div>;
  return (
    <div>
      <div className="text-xl text-zinc-300">Battle Stats</div>
      <div className="space-y-2 pt-2">
        {events.map((event) => {
          return (
            <div key={event.event_id} className="rounded-md bg-zinc-800 p-4">
              <Link href={`/battlestats/${event.event_id}`}>{event.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default battleStats;
