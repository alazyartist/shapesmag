import { Events } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { api } from "~/utils/api";

const ManageBattleStats = ({ setActiveView, events }) => {
  const ref = useRef();
  useClickOutside(ref, () => setActiveView(null));
  const [deleteId, setDeleteId] = useState(null);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [activeEvent, setActiveEvent] = useState(events[0].event_id);
  const { data: fullEvent } = api.battleStats.getStatsByEvent.useQuery({
    event_id: activeEvent,
  });
  const queryClient = useQueryClient();
  const { data: athletes } = api.athletes.getAll.useQuery();
  const { mutate: deleteBattle, status } =
    api.battleStats.deleteBattleandStats.useMutation({
      onSuccess: () => queryClient.invalidateQueries(),
    });
  useEffect(() => {
    if (status === "success") {
      setDeleteCheck(false);
    }
  }, [status]);
  const getAthlete = (id) => {
    return athletes.find((athlete) => athlete.athlete_id === id);
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div ref={ref} className="grid grid-cols-[1fr,3fr]">
        <div className="minimalistScroll overflow-y-scroll rounded-l-md bg-zinc-900 text-zinc-300">
          {events.map((event: Events) => (
            <div
              key={event.event_id}
              className="flex justify-between gap-2 p-2"
            >
              <p>{event.name}</p>
              <button
                type="button"
                onClick={() => setActiveEvent(event.event_id)}
                className="rounded-md bg-zinc-800 p-1 text-xs"
              >
                edit
              </button>
            </div>
          ))}
        </div>
        <div className="grid gap-4 rounded-r-md bg-zinc-300 bg-opacity-70 p-2">
          <div className="minimalistScroll relative space-y-2 overflow-y-scroll">
            {Array.isArray(fullEvent?.Battles) &&
              fullEvent.Battles.sort((a, b) => {
                return a.battleNum > b.battleNum ? 1 : -1;
              }).map((battle) => (
                <div
                  className="flex justify-between gap-2 border-b-2 text-zinc-800"
                  key={battle.battle_id}
                >
                  <p>{battle.battleNum}</p>
                  <p>{battle.versus}</p>
                  <div className="">
                    {Array.isArray(battle.stats) &&
                      battle.stats.map((stat) => {
                        const athlete = getAthlete(stat.athlete_id);
                        return (
                          <div key={stat.id} className="grid grid-cols-5">
                            <p>{athlete.name}</p>
                            <p>{stat.votes}</p>
                            <p>{stat.totalVotes}</p>
                            <p>{stat.percent}</p>
                            <p>{stat.impressions}</p>
                          </div>
                        );
                      })}
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-red-300 p-1 text-xs text-red-800"
                    onClick={() => {
                      setDeleteCheck(true);
                      setDeleteId(battle);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            {deleteCheck && (
              <div className="absolute left-0 top-0 flex h-full w-full justify-between gap-4 bg-red-500">
                <button
                  type="button"
                  onClick={() =>
                    deleteBattle({
                      battle_id: deleteId.battle_id,
                      event_id: deleteId.event_id,
                      athlete_ids: [...deleteId.stats.map((s) => s.athlete_id)],
                    })
                  }
                  className="rounded-md bg-zinc-800 p-4 text-xl text-zinc-300"
                >
                  Yes,Delete It
                </button>
                <div>
                  <p className="text-3xl font-bold">
                    Are you Sure you want to Delete?
                  </p>
                  <p>{deleteId.versus}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteCheck(false)}
                  className="rounded-md bg-zinc-800 p-4 text-xl text-zinc-300"
                >
                  No, I was Kidding
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBattleStats;
