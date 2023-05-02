import { create } from "zustand";
interface BattleStore {
  battle: string;
  event: string;
  setEvent: (value: string) => void;
  setBattle: (value: string) => void;
  stats: Array<{}>;
  setStats: (value: Array<{}>) => void;
}
const useBattleStore = create<BattleStore>((set, get) => ({
  stats: [],
  event: "",
  battle: "",
  setEvent: (value) => set(() => ({ event: value })),
  setBattle: (value) => set(() => ({ battle: value })),
  setStats: (value) => set(() => ({ stats: value })),
}));
