import { sheets_v4 } from "googleapis";
import React, { useState } from "react";
import AddAthleteModal from "~/components/AddAthleteModal";
import AddEventModal from "~/components/AddEventModal";
import { api } from "~/utils/api";

const AdminIndex = () => {
  const { data } = api.battleStats.getSheets.useQuery();
  const [activeSheet, setActiveSheet] = useState<string>("NEO 7");
  const { data: details } = api.battleStats.getSheetValues.useQuery({
    sheet: activeSheet,
  });

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
        console.log(obj, "obj");
        return obj;
      })
      .filter((s) => s !== undefined);

    return arr;
  };

  const preparedData = prepData(details);
  const [activeView, setActiveView] = useState<string>("Events");
  // const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  // const [athleteModal, setAthleteModal] = useState<boolean>(false);
  // const [eventModal, setEventModal] = useState<boolean>(false);
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
        <AddEventModal setActiveView={setActiveView} />
      )}
      {activeView === "Sheet" && (
        <div className="grid h-[80vh] w-full grid-cols-[1fr,4fr] ">
          <SheetListDisplay
            activeSheet={activeSheet}
            setActiveSheet={setActiveSheet}
            data={data}
          />
          <div className="no-scrollbar relative overflow-hidden overflow-y-scroll">
            <h1
              onClick={() => setGoogleDataVisible((pr) => !pr)}
              className="sticky top-[-14px] w-full text-center text-3xl font-bold"
            >
              {activeSheet}
            </h1>
            <SheetValuesDisplay
              googleDataVisible={googleDataVisible}
              preparedData={preparedData}
              details={details}
            />
            {/* <div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-4">
            {preparedData?.map((d) => {
              return (
                <>
                  <div>{d["Name"]}</div>
                  <div>{d["Insta"]}</div>
                  <div>{d["Votes"]}</div>
                  <div>{d["% of votes"]}</div>
                  <div>{d["Total Voters"]}</div>
                  <div>{d["Sticker Taps"]}</div>
                  <div>{d["Impressions"]}</div>
                </>
              );
            })}
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminIndex;

const SheetValuesDisplay = ({ details, preparedData, googleDataVisible }) => {
  return (
    <>
      <div className=" grid grid-cols-[1fr,1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-4">
        {details?.values?.[0]?.map((col) => (
          <div key={col}>{col}</div>
        ))}
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
                  onClick={() =>
                    console.log(preparedData[i], preparedData[i + 1])
                  }
                  className="rounded-md bg-emerald-300 p-1 text-center text-emerald-800"
                >
                  add battle info
                </div>
              )}
            </>
          ))}
      </div>
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
    <div>
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
