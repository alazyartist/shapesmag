import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const AthletePage = () => {
  const router = useRouter();
  const athlete_id = router?.query?.id;
  const { data: athleteDetails } = api.athletes.getAthleteDetails.useQuery({
    athlete_id: parseInt(athlete_id as string),
  });
  return (
    <div>
      <div>AthletePage</div>
      <div>{athleteDetails.name}</div>
      <div>{athleteDetails.insta}</div>
      <div>{athleteDetails.athlete_id}</div>
    </div>
  );
};

export default AthletePage;
