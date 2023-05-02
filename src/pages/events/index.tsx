import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const UpcomingEvents = () => {
  const { data: events } = api.events.getAll.useQuery();
  if (!events) return <div>Loading Event Details...</div>;
  const upcoming = events.filter(
    (event) => new Date(event.date) >= new Date(Date.now())
  );
  const previous = events.filter(
    (event) => new Date(event.date) <= new Date(Date.now())
  );
  return (
    <div>
      <div className="p-2 text-3xl font-bold">Upcoming Events</div>
      <div>
        {upcoming.length > 0
          ? upcoming.map((event) => (
              <Link
                key={event.event_id}
                className="flex place-content-center place-items-center rounded-md bg-zinc-800 p-4 text-zinc-300"
                href={`/events/${event.name}`}
              >
                <p className="text-center">{event.name}</p>
              </Link>
            ))
          : "No Upcoming Events"}
      </div>
      <div className="p-2 text-3xl font-bold">Previous Events</div>
      <div>
        {previous.map((event) => (
          <Link
            key={event.event_id}
            className="flex place-content-center place-items-center rounded-md bg-zinc-800 p-4 text-zinc-300"
            href={`/battlestats/${event.event_id}`}
          >
            <p className="text-center">{event.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
