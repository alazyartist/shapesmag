import type { sheets_v4 } from "googleapis";
import React, { useState } from "react";
import AddAthleteModal from "~/components/AddAthleteModal";
import AddBattleModal from "~/components/AddBattleModal";
import AddEventModal from "~/components/AddEventModal";
import EventDropdown from "~/components/EventDropdown";
import useBattleStore from "~/hooks/useBattleStore";
import { api } from "~/utils/api";

const AdminIndex = () => {
  const { data } = api.battleStats.getSheets.useQuery();
  const [activeSheet, setActiveSheet] = useState<string>("NEO 7");
  const { data: details } = api.battleStats.getSheetValues.useQuery({
    sheet: activeSheet,
  });
  const { data: events } = api.events.getAll.useQuery();

  const prepData = (details: sheets_v4.Schema$ValueRange) => {
    if (details?.values === undefined) return;
    const arr = details?.values
      ?.slice(1)
      ?.map((v, i) => {
        if (details?.values?.[i]?.[0] === undefined) return;
        const obj = {
          [details?.values?.[0]?.[0]]: details?.values?.[i]?.[0],
          [details?.values?.[0]?.[1]]: details?.values?.[i]?.[1],
          [details?.values?.[0]?.[2]]: details?.values?.[i]?.[2],
          [details?.values?.[0]?.[3]]: details?.values?.[i]?.[3],
          [details?.values?.[0]?.[4]]:
            details?.values?.[i]?.[4] === ""
              ? details?.values?.[i - 1]?.[4]
              : details?.values?.[i]?.[4],
          [details?.values?.[0]?.[5]]: details?.values?.[i]?.[5],
          [details?.values?.[0]?.[6]]:
            details?.values?.[i]?.[6] === ""
              ? details?.values?.[i - 1]?.[6]
              : details?.values?.[i]?.[6],
        };
        return obj;
      })
      .filter((s) => s !== undefined);

    return arr;
  };

  const preparedData = prepData(details);
  const [activeView, setActiveView] = useState<string>("Events");
  const [googleDataVisible, setGoogleDataVisible] = useState<boolean>(false);
  return (
    <div className="h-[90vh] w-[95vw] max-w-[1200px] p-4">
      <div className="flex w-full">
        <button
          type="button"
          onClick={() =>
            activeView === "Sheet"
              ? setActiveView(null)
              : setActiveView("Sheet")
          }
          className="rounded-md bg-zinc-500 p-2"
        >
          {activeView === "Sheet" ? "Hide" : "See"} SheetData
        </button>
        <button
          onClick={() => setActiveView("Athlete")}
          type="button"
          className="rounded-md bg-zinc-500 p-2"
        >
          Add User
        </button>
        <button
          onClick={() => setActiveView("Event")}
          type="button"
          className="rounded-md bg-zinc-500 p-2"
        >
          Add Event
        </button>
      </div>
      {activeView === "Athlete" && (
        <AddAthleteModal setActiveView={setActiveView} />
      )}
      {activeView === "Event" && (
        <AddEventModal events={events} setActiveView={setActiveView} />
      )}
      {activeView === "Battle" && <AddBattleModal />}
      {
        <div className="grid h-[80vh] w-full grid-cols-[1fr,4fr] bg-zinc-800 p-4 text-zinc-300">
          <SheetListDisplay
            activeSheet={activeSheet}
            setActiveSheet={setActiveSheet}
            data={data}
          />
          <div className="minimalistScroll relative overflow-hidden overflow-y-scroll">
            <h1
              onClick={() => setGoogleDataVisible((pr) => !pr)}
              className="sticky top-0 w-full bg-zinc-800 text-center text-3xl font-bold"
            >
              {activeSheet}
              <p className="text-sm font-normal text-zinc-400">
                {googleDataVisible ? "google data in grey" : ""}
              </p>
            </h1>
            <SheetValuesDisplay
              events={events}
              googleDataVisible={googleDataVisible}
              preparedData={preparedData}
              details={details}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default AdminIndex;

const SheetValuesDisplay = ({
  events,
  details,
  preparedData,
  googleDataVisible,
}) => {
  const activeEvent = useBattleStore((s) => s.event);
  const setAthletes = useBattleStore((s) => s.setAthletes);
  const setStats = useBattleStore((s) => s.setStats);
  const setBattle = useBattleStore((s) => s.setBattle);
  const [battleModalOpen, setBattleModalOpen] = useState(false);
  const { data: athletes } = api.athletes.getAll.useQuery();
  const handleAddBattle = (i) => {
    console.log("addingBattle");
    setAthletes([preparedData[i], preparedData[i + 1]]);
    setStats([preparedData[i], preparedData[i + 1]]);
    setBattle(`${preparedData[i].Name} vs ${preparedData[i + 1].Name}`);
    console.log({
      stats: [preparedData[i], preparedData[i + 1]],
      event: activeEvent,
    });
    setBattleModalOpen(true);
  };
  return (
    <>
      <div className={"sticky top-8 w-full bg-zinc-800 p-2"}>
        <div className="grid grid-cols-[1fr,1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-4 ">
          {details?.values?.[0]?.map((col) => (
            <div key={col}>{col}</div>
          ))}
        </div>
        {events && <EventDropdown options={events} />}
      </div>
      <div className="h-full gap-4   ">
        {details?.values
          ?.slice(1, -1)
          ?.filter((s) => s.length > 0)
          .map((row: string[], i: number) => (
            <>
              <div
                key={`${i},${row?.[0]}`}
                className=" grid grid-cols-[.2fr,1fr,2fr,.5fr,.5fr,.5fr,.5fr,.5fr] "
              >
                <>
                  {/* guess at battle */}
                  {i % 2 === 0 && (
                    <div className="col-span-8 p-1 text-center text-xl">
                      {preparedData?.[i + 1]?.["Name"]}
                      {" vs "}
                      {preparedData?.[i + 2]?.["Name"]}
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={doesAthleteExist(
                      athletes,
                      preparedData[i + 1].Name
                    )}
                    onChange={(e) => console.log(e.target.checked)}
                  />
                  <RowDisplay
                    googleDataVisible={googleDataVisible}
                    preparedData={preparedData}
                    row={row}
                    i={i}
                  />
                </>
              </div>
              {i % 2 !== 0 && (
                <div
                  onClick={() => handleAddBattle(i)}
                  className="rounded-md bg-emerald-300 p-1 text-center text-emerald-800"
                >
                  add battle info
                </div>
              )}
            </>
          ))}
      </div>
      {battleModalOpen && <AddBattleInfo setOpen={setBattleModalOpen} />}
    </>
  );
};

const RowDisplay = ({ row, googleDataVisible, preparedData, i }) => {
  return row.map((col: string, inde: number) => {
    const keys = Object.keys(preparedData?.[i]);
    const key = keys[inde] ?? 0;
    const match = preparedData?.[i + 1]?.[key] === col;
    return (
      <div
        key={`${col},${i}`}
        className={`rounded-md border-[1px]  p-1 ${
          match ? "border-emerald-300" : "border-red-300"
        }`}
      >
        {googleDataVisible && <div className="text-zinc-400">{col}</div>}
        <div className="text-zinc-200">{preparedData[i + 1]?.[key]}</div>
      </div>
    );
  });
};

const SheetListDisplay = ({ data, activeSheet, setActiveSheet }) => {
  return (
    <div className="minimalistScroll h-full overflow-hidden overflow-y-scroll">
      {data?.statSheet?.sheets?.map((s, i) => (
        <div
          key={`${i}:row`}
          className={`border-[1px] border-zinc-300 ${
            activeSheet === s.properties.title ? "bg-zinc-800" : ""
          } p-1`}
          onClick={() => setActiveSheet(s?.properties?.title)}
        >
          {s?.properties?.title}
        </div>
      ))}
    </div>
  );
};
const doesAthleteExist = (athletes, name) => {
  for (let i = 0; i < athletes.length; i++) {
    if (athletes[i].name === name) {
      return true;
    }
  }
  return false;
};

const AddBattleInfo = ({ setOpen }) => {
  const { data: athletes } = api.athletes.getAll.useQuery();
  const battleStore = useBattleStore();
  console.log(battleStore.event);
  const { mutate: addBattleStats } =
    api.battleStats.addBattleStats.useMutation();

  return (
    <div
      className={
        "absolute left-0 top-0 flex h-full w-full flex-col content-center items-center bg-zinc-800"
      }
    >
      <div className="h-full w-full  text-zinc-300">battle info review</div>
      <p>{battleStore.event}</p>
      <p>{battleStore.battle}</p>
      <div>
        {battleStore.athletes.map((a) => (
          <p>{a.Name}</p>
        ))}
      </div>
      <div>
        {battleStore.stats.map((stat) => (
          <div className="grid grid-cols-7 gap-2">
            <div
              className={`${
                doesAthleteExist(athletes, stat?.Name)
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            >
              {stat?.["Name"]}
            </div>
            <div>{stat?.["Insta"]}</div>
            <div>{stat?.["Votes"]}</div>
            <div>{stat?.["Stick Taps"]}</div>
            <div>{stat?.["Total Voters"]}</div>
            <div>{stat?.["Impressions"]}</div>
            <div>{stat?.["% of votes"]}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={battleStore.event === "Choose Event"}
        onClick={() =>
          addBattleStats({
            name: battleStore.event,
            versus: battleStore.battle,
            stats: battleStore.stats,
          })
        }
        className="h-full w-full bg-emerald-500 text-zinc-300"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="h-full w-full bg-zinc-800 text-zinc-300"
      >
        Cancel
      </button>
    </div>
  );
};
