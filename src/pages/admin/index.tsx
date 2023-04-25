import React from "react";
import { api } from "~/utils/api";

const AdminIndex = () => {
  const { data } = api.battleStats.getSheets.useQuery();
  data?.sheets?.forEach((s) => {
    console.log(s);
    console.log(s?.properties?.title);
  });
  return (
    <div>
      <div className="rounded-md bg-zinc-500 p-2">Add Event</div>
      {data?.sheets?.map((s) => (
        <div>{s?.properties?.title}</div>
      ))}
    </div>
  );
};

export default AdminIndex;
