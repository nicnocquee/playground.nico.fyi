import { getGlobalData } from "./data-source";

export default async function GlobalData() {
  console.log(`RSC: global-data.tsx`);
  const globalData = await getGlobalData();
  return (
    <div>
      <h2 className="text-xl">Global Data</h2>
      <p>{globalData.name}</p>
      <p>{globalData.description}</p>
      <p>{globalData.serverTime}</p>
    </div>
  );
}
