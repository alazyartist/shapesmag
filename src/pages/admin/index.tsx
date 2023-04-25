import React, { useState } from "react";
import { api } from "~/utils/api";

const AdminIndex = () => {
  const { data } = api.battleStats.getSheets.useQuery();
  const [activeSheet, setActiveSheet] = useState("NEO 7");
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { data: details } = api.battleStats.getSheetValues.useQuery({
    sheet: activeSheet,
  });
  data?.statSheet?.sheets?.forEach((s) => {
    console.log(s);
    console.log(s?.properties?.title);
  });
  const prepData = (details) => {
    console.log(details);
    if (details?.values === undefined) return;
    const arr = details.values
      .slice(1)
      .map((v, i) => {
        if (details.values?.[i]?.[0] === undefined) return;
        const obj = {
          [details.values[0][0]]: details.values[i][0],
          [details.values[0][1]]: details.values[i][1],
          [details.values[0][2]]: details.values[i][2],
          [details.values[0][3]]: details.values[i][3],
          [details.values[0][4]]: details.values[i][4],
          [details.values[0][5]]: details.values[i][5],
          [details.values[0][6]]: details.values[i][6],
        };
        console.log(obj, "obj");
        return obj;
      })
      .filter((s) => s !== undefined);
    console.log("arr", arr);
  };
  prepData(details);
  return (
    <div className="p-4">
      <div className="flex w-full">
        <div className="rounded-md bg-zinc-500 p-2">Add Event</div>
        <button
          type="button"
          onClick={() => setDetailsVisible((prev) => !prev)}
          className="rounded-md bg-zinc-500 p-2"
        >
          Show Details
        </button>
      </div>
      <div className="grid w-screen grid-cols-[1fr,4fr] ">
        <div>
          {!detailsVisible &&
            data?.statSheet?.sheets?.map((s, i) => (
              <div
                onClick={() => setActiveSheet(s?.properties?.title as string)}
              >
                {s?.properties?.title}
              </div>
            ))}
        </div>
        <div>
          <h1 className="w-full text-center text-xl">{activeSheet}</h1>
          <SheetValuesDisplay details={details} />
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;

const SheetValuesDisplay = ({ details }) => {
  return (
    <>
      <div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-4">
        {details?.values?.[0]?.map((col) => (
          <div>{col}</div>
        ))}
      </div>
      <div className=" gap-4">
        {details?.values
          ?.slice(1, -1)
          ?.filter((s) => s.length > 0)
          .map((row, i) => (
            <div className=" grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr]">
              {row.map((col) => (
                <div>{col}</div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};
