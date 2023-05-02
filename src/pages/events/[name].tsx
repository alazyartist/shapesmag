import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const EventDetails = () => {
  const router = useRouter();
  const name: string = router.query?.name as string;
  const { data: eventData } = api.events.getEventDetailsByName.useQuery({
    name: name,
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
      <div className="rounded-md bg-zinc-900 p-2 text-zinc-300">
        {eventData.contactinfo}
      </div>
      <div className="rounded-md bg-zinc-900 p-2 text-zinc-300">
        {eventData.details}
      </div>
      {new Date(Date.now()).toDateString() <=
      new Date(eventData.date).toDateString() ? (
        <a href={`https://${eventData.ticketlink}`} target="_blank">
          Buy your ticket
        </a>
      ) : (
        eventData.Battles.map((battle) => <div>{battle.versus}</div>)
      )}
    </div>
  );
};

export default EventDetails;
