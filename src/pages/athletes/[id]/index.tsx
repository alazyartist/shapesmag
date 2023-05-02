import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ShapesSvg from "~/components/ShapesSvg";
import { api } from "~/utils/api";

const AthletePage = () => {
  const router = useRouter();
  const athlete_id = router?.query?.id;
  const { data: athleteDetails } = api.athletes.getAthleteDetails.useQuery({
    athlete_id: parseInt(athlete_id as string),
  });
  if (!athleteDetails) return <div>No Details for this Athlete Yet</div>;
  return (
    <div className="flex min-h-[600px] flex-col">
      <div className={"grid h-fit w-full grid-cols-2"}>
        <Image
          src={"/SHAPESCHAIN.PNG"}
          alt={"shapeschain"}
          width={300}
          height={30}
        />
        <Image
          src={"/SHAPESCHAIN.PNG"}
          alt={"shapeschain"}
          width={300}
          height={30}
        />
      </div>
      <div className="text-4xl font-bold">{athleteDetails.name}</div>
      <div className="text-xl">{athleteDetails.insta}</div>
      <div className="text-xl font-bold">Battles</div>
      <div>
        {athleteDetails.battles.map((battle) => (
          <BattleDisplay battle={battle} />
        ))}
      </div>
      <div className="text-xl font-bold">Events</div>
      <div>
        {athleteDetails.events.map((event) => (
          <EventsDisplay event={event} />
        ))}
      </div>
    </div>
  );
};

export default AthletePage;
const BattleDisplay = ({ battle }) => {
  return (
    <div className="flex justify-between gap-4 rounded-md bg-zinc-300 p-2">
      <div>{battle.battle.versus}</div>
      <div>{battle.battle.event.name}</div>
    </div>
  );
};
const EventsDisplay = ({ event }) => {
  return (
    <div className="flex justify-between gap-4 rounded-md bg-zinc-300 p-2">
      <div>{event.Event.name}</div>
      <div>{new Date(event.Event.date).getFullYear()}</div>
    </div>
  );
};
