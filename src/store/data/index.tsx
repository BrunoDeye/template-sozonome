import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ActionsProps = {
  addGrid: (grid: string) => void;
  addPlace: (place: string) => void;
  addSystemType: (systemType: string) => void;
  addTotalPower: (totalPower: number) => void;
  addTotalEnergy: (totalEnergy: number) => void;
  addFC: (FC: number) => void;
  addBatteryModel: (model: string) => void;
  addBatteryQty: (qty: number) => void;
  reset: () => void;
};

type StateProps = {
  state: {
    batteryModel: string;
    grid: string;
    place: string;
    systemType: string;
    totalEnergy: number;
    totalPower: number;
    batteryQty: number;
    FC: number;
  };
};

type StoreProps = {
  state: {
    batteryModel: string;
    grid: string;
    place: string;
    systemType: string;
    totalEnergy: number;
    totalPower: number;
    batteryQty: number;
    FC: number;
  };
  actions: ActionsProps;
};

const initialState: StateProps = {
  state: {
    batteryModel: '',
    grid: '',
    place: '',
    systemType: '',
    totalEnergy: 0,
    totalPower: 0,
    batteryQty: 0,
    FC: 94,
  },
};

export const useDataStore = create(
  persist<StoreProps>(
    (set, get) => ({
      state: {
        batteryModel: '',
        grid: '',
        place: '',
        systemType: '',
        totalEnergy: 0,
        totalPower: 0,
        batteryQty: 0,
        FC: 94,
      },
      actions: {
        addGrid: (grid) =>
          set((store) => ({
            state: { ...store.state, grid: grid },
          })),
        addPlace: (place) =>
          set((store) => ({
            state: { ...store.state, place: place },
          })),
        addSystemType: (systemType) =>
          set((store) => ({
            state: { ...store.state, systemType: systemType },
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
        addBatteryModel: (batteryModel) =>
          set((store) => ({
            state: { ...store.state, batteryModel: batteryModel },
          })),
        addBatteryQty: (batteryQty) =>
          set((store) => ({
            state: { ...store.state, batteryQty: batteryQty },
          })),
        reset: () => {
          set(initialState);
        },
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
                place: (persistedState as StoreProps).state.place,
                systemType: (persistedState as StoreProps).state.systemType,
                totalEnergy: (persistedState as StoreProps).state.totalEnergy,
                totalPower: (persistedState as StoreProps).state.totalPower,
                batteryQty: (persistedState as StoreProps).state.batteryQty,
                FC: (persistedState as StoreProps).state.FC,
                batteryModel: (persistedState as StoreProps).state.batteryModel,
              },
              actions: {
                addGrid: currentState.actions.addGrid,
                addPlace: currentState.actions.addPlace,
                addSystemType: currentState.actions.addSystemType,
                addTotalPower: currentState.actions.addTotalPower,
                addTotalEnergy: currentState.actions.addTotalEnergy,
                addBatteryModel: currentState.actions.addBatteryModel,
                addBatteryQty: currentState.actions.addBatteryQty,
                addFC: currentState.actions.addFC,
                reset: currentState.actions.reset,
              },
            },
    }
  )
);
