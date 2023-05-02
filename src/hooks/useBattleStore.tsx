import { create } from "zustand";
interface Stat {
  Name: string;
  Insta: string;
  Votes: string;
  "% of votes": string;
  "Total Voters": string;
  "Stick Taps": string;
  Impressions: string;
}
interface BattleStore {
  battle: string;
  event: string;
  setEvent: (value: string) => void;
  setBattle: (value: string) => void;
  athletes: Array<Stat>;
  stats: Array<Stat>;
  setStats: (value: Array<Stat>) => void;
  setAthletes: (value: Array<Stat>) => void;
}
const useBattleStore = create<BattleStore>((set, get) => ({
  stats: [],
  athletes: [],
  event: "Choose Event",
  battle: "",
  setAthletes: (value) => set(() => ({ athletes: value })),
  setEvent: (value) => set(() => ({ event: value })),
  setBattle: (value) => set(() => ({ battle: value })),
  setStats: (value) => set(() => ({ stats: value })),
}));

export default useBattleStore;
