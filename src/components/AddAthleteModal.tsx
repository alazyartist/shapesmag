import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { FormEvent, ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Athletes } from "@prisma/client";
const AddAthleteModal = ({ setActiveView }) => {
  const { mutate: createAthlete } = api.athletes.createAthlete.useMutation({
    onSuccess: () => queryClient.invalidateQueries(),
  });
  const { mutate: updateAthlete } = api.athletes.updateAthlete.useMutation({
    onSuccess: () => queryClient.invalidateQueries(),
  });
  const { mutate: deleteAthlete } = api.athletes.deleteAthlete.useMutation({
    onSuccess: () => queryClient.invalidateQueries(),
  });
  const { data: athletes } = api.athletes.getAll.useQuery();
  const startid = (athletes?.length as number) + 1;
  const [athleteId, setAthleteId] = useState<number>(startid);
  const [clerkId, setClerkId] = useState("");
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [insta, setInsta] = useState("");
  const queryClient = useQueryClient();
  useEffect(() => {
    if (athletes.length) {
      setAthleteId(athletes.length + 1);
    }
  }, [athletes]);

  const handleUpdateUser = (athlete: Athletes) => {
    setUpdating(true);
    setInsta(athlete.insta);
    setName(athlete.name);
    setAthleteId(athlete.athlete_id);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = {
      athlete_id: athleteId,
      clerk_id: null,
      name: name,
      insta: insta,
    };
    updating ? updateAthlete({ ...input }) : createAthlete({ ...input });

    setActiveView(null);
    // Handle the returned athlete object as needed
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div className=" grid grid-cols-[1fr,5fr] p-2">
        <div className="rounded-l-md bg-zinc-800 text-zinc-300">
          {athletes?.map((athlete) => {
            return (
              <div
                key={athlete.name}
                className="flex justify-between gap-2 p-2"
              >
                <p>{athlete.name}</p>
                <button
                  type="button"
                  onClick={() => handleUpdateUser(athlete)}
                  className="rounded-md bg-zinc-800 p-1 text-xs"
                >
                  edit
                </button>
              </div>
            );
          })}
        </div>
        <form
          className=" grid gap-4 rounded-r-md bg-zinc-300 bg-opacity-80 p-2"
          onSubmit={handleSubmit}
        >
          <label className={"grid grid-cols-2"}>
            Athlete ID:
            <div className={"text-zinc-900"}>{athleteId}</div>
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
          <div className="flex justify-between">
            <div>
              <button
                className="rounded-md bg-zinc-300 p-2 text-zinc-800"
                type="submit"
              >
                {updating ? "Update" : "Create"} Athlete
              </button>

              <button
                onClick={() => setActiveView(null)}
                className="rounded-md bg-red-300 p-2 text-red-800"
                type="button"
              >
                Cancel
              </button>
            </div>
            <div>
              {updating && (
                <button
                  onClick={() => deleteAthlete({ athlete_id: athleteId })}
                  className=" rounded-md bg-red-500 p-2 text-red-800"
                  type="button"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAthleteModal;
