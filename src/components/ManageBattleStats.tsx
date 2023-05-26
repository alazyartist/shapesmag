import { Events } from "@prisma/client";
import React, { useRef } from "react";
import useClickOutside from "~/hooks/useClickOutside";

const ManageBattleStats = ({ setActiveView, events }) => {
  const ref = useRef();
  useClickOutside(ref, () => setActiveView(null));
  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-md">
      <div ref={ref} className="grid grid-cols-[1fr,3fr]">
        <div className="minimalistScroll overflow-y-scroll rounded-l-md bg-zinc-900 text-zinc-300">
          {events.map((event: Events) => (
            <div key={event.event_id} className="p-2">
              {event.name}
            </div>
          ))}
        </div>
        <div className="grid gap-4 rounded-r-md bg-zinc-300 bg-opacity-70 p-2"></div>
      </div>
    </div>
  );
};

export default ManageBattleStats;
