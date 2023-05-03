import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const EventPage = () => {
  const router = useRouter();
  const event_id: string = router.query?.event_id as string;
  const { data: eventData } = api.events.getEventDetails.useQuery({
    event_id: event_id,
  });
  if (!eventData) return <div>Event Details Loading...</div>;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-4xl font-bold">{eventData.name}</div>
      <div className=" font-light">
        {new Date(eventData.date).toDateString()}
      </div>
      <div>{eventData.location}</div>
      <div>{eventData.host}</div>
      {/* <div className="rounded-md bg-zinc-900 p-2 text-zinc-300">
        {eventData.contactinfo}
      </div> */}
      <div className="rounded-md bg-zinc-900 p-2 text-zinc-300">
        {eventData.details}
      </div>
      {new Date(Date.now()).toDateString() <=
      new Date(eventData.date).toDateString() ? (
        <a href={`https://${eventData.ticketlink}`} target="_blank">
          Buy your ticket
        </a>
      ) : (
        eventData.Battles.map((battle) => (
          <div key={battle.battle_id}>{battle.versus}</div>
        ))
      )}
    </div>
  );
};

export default EventPage;
