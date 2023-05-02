import { create } from "zustand";
interface BattleStore {
  battle: string;
  athletes: Array<{}>;
  event: string;
  setEvent: (value: string) => void;
  setBattle: (value: string) => void;
  stats: Array<{}>;
  setStats: (value: Array<{}>) => void;
  setAthlete: (value: Array<{}>) => void;
}
const useBattleStore = create<BattleStore>((set, get) => ({
  stats: [],
  athletes: [],
  event: "Choose Event",
  battle: "",
  setAthlete: (value) => set(() => ({ athletes: value })),
  setEvent: (value) => set(() => ({ event: value })),
  setBattle: (value) => set(() => ({ battle: value })),
  setStats: (value) => set(() => ({ stats: value })),
}));

export default useBattleStore;
