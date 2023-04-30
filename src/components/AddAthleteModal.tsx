import React, { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";

const AddAthleteModal = ({ setActiveView }) => {
  const { mutate: createAthlete } = api.athletes.createAthlete.useMutation();
  const { data: athletes } = api.athletes.getAll.useQuery();
  const startid = (athletes?.length as number) + 1 ?? 0;
  const [athleteId, setAthleteId] = useState<number>(startid);
  const [clerkId, setClerkId] = useState("");
  const [name, setName] = useState("");
  const [insta, setInsta] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = {
      athlete_id: athleteId,
      clerk_id: null,
      name: name,
      insta: insta,
    };
    createAthlete({ ...input });
    // Handle the returned athlete object as needed
  };

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div className=" grid grid-cols-[1fr,5fr] p-2">
        <div className="rounded-md bg-zinc-800">
          {athletes?.map((athlete) => {
            return (
              <div key={athlete.name} className="p-2">
                {athlete.name}
              </div>
            );
          })}
        </div>
        <form className="grid gap-4 p-2" onSubmit={handleSubmit}>
          <label className={"grid grid-cols-2"}>
            Athlete ID:
            <div className={"text-zinc-300"}>{athleteId}</div>
          </label>
          <label className={"grid grid-cols-2"}>
            Clerk ID (optional):
            <input
              className={"text-zinc-900"}
              type="text"
              value={clerkId}
              onChange={(e) => setClerkId(e.target.value)}
            />
          </label>
          <label className={"grid grid-cols-2"}>
            Name:
            <input
              className={"text-zinc-900"}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={"grid grid-cols-2"}>
            Instagram:
            <input
              className={"text-zinc-900"}
              type="text"
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
            />
          </label>
          <div>
            <button
              className="rounded-md bg-zinc-300 p-2 text-zinc-800"
              type="submit"
            >
              Create Athlete
            </button>

            <button
              onClick={() => setActiveView(null)}
              className="rounded-md bg-red-300 p-2 text-red-800"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAthleteModal;
