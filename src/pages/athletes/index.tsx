import React from "react";
import { api } from "~/utils/api";

const AthletePage = () => {
  const { data: athletes } = api.Athletes.getAll.useQuery();
  return (
    <div className="text-xl text-zinc-300">
      <div>Athlete's</div>
      {athletes?.map((athlete) => {
        return (
          <div className="flex gap-4">
            <div>{athlete.name}</div>
            <div>{athlete.insta}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AthletePage;
