import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ActionsProps = {
  addGrid: (grid: string) => void;
  addTotalPower: (totalPower: number) => void;
  addTotalEnergy: (totalEnergy: number) => void;
  addFC: (FC: number) => void;
};

type StoreProps = {
  state: {
    grid: string;
    totalEnergy: number;
    totalPower: number;
    FC: number;
  };
  actions: ActionsProps;
};

export const useDataStore = create(
  persist<StoreProps>(
    (set, get) => ({
      state: {
        grid: '',
        totalEnergy: 0,
        totalPower: 0,
        FC: 94,
      },
      actions: {
        addGrid: (grid) =>
          set((store) => ({
            state: { ...store.state, grid: grid },
          })),
        addTotalPower: (totalPower) =>
          set((store) => ({
            state: { ...store.state, totalPower: totalPower },
          })),
        addTotalEnergy: (totalEnergy) =>
          set((store) => ({
            state: { ...store.state, totalEnergy: totalEnergy },
          })),
        addFC: (FC) =>
          set((store) => ({
            state: { ...store.state, FC: FC },
          })),
      },
    }),
    {
      name: 'calculator-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      merge: (persistedState, currentState) =>
        !localStorage.getItem('calculator-storage')
          ? { ...currentState }
          : {
              state: {
                grid: (persistedState as StoreProps).state.grid,
                totalEnergy: currentState.state.totalEnergy,
                totalPower: currentState.state.totalPower,
                FC: (persistedState as StoreProps).state.FC,
              },
              actions: {
                addGrid: currentState.actions.addGrid,
                addTotalPower: currentState.actions.addTotalPower,
                addTotalEnergy: currentState.actions.addTotalEnergy,
                addFC: currentState.actions.addFC,
              },
            },
    }
  )
);
