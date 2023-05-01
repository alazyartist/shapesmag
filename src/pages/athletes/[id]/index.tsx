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
    <div>
      <div>AthletePage</div>
      <div className={"h-full w-full"}>
        <ShapesSvg />
      </div>
      <div>{athleteDetails.name}</div>
      <div>{athleteDetails.insta}</div>
      <div>{athleteDetails.athlete_id}</div>
    </div>
  );
};

export default AthletePage;
