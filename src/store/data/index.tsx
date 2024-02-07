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
  addInverterQty: (qty: number) => void;
  addInverterQtyToSave: (qty: number) => void;
  addBatteryQtyToSave: (qty: number) => void;
  addRecommendedInverter: (inverter: string) => void;
  reset: () => void;
};

type StateProps = {
  batteryModel: string;
  grid: string;
  totalEnergy: number;
  totalPower: number;
  batteryQty: number;
  batteryQtyToSave: number;
  FC: number;
  inverterQty: number;
  inverterQtyToSave: number;
  recommendedInverter: string;
  place: string; // not using
  systemType: string; // not using
};

type StoreProps = {
  state: StateProps;
  actions: ActionsProps;
};

const initialState: StateProps = {
  batteryModel: '',
  grid: '',
  place: '',
  systemType: '',
  totalEnergy: 0,
  totalPower: 0,
  batteryQty: 0,
  inverterQtyToSave: 0,
  batteryQtyToSave: 0,
  inverterQty: 0,
  recommendedInverter: '',
  FC: 94,
};

export const useDataStore = create(
  persist<StoreProps>(
    (set, get) => ({
      state: {
        ...initialState,
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
        addInverterQty: (inverterQty) =>
          set((store) => ({
            state: { ...store.state, inverterQty: inverterQty },
          })),
        addInverterQtyToSave: (inverterQtyToSave) =>
          set((store) => ({
            state: { ...store.state, inverterQtyToSave: inverterQtyToSave },
          })),
        addBatteryQtyToSave: (batteryQtyToSave) =>
          set((store) => ({
            state: { ...store.state, batteryQtyToSave: batteryQtyToSave },
          })),
        addRecommendedInverter: (inverter) =>
          set((store) => ({
            state: { ...store.state, recommendedInverter: inverter },
          })),
        reset: () => {
          set({ state: { ...initialState } });
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
                inverterQty: (persistedState as StoreProps).state.inverterQty,
                inverterQtyToSave: (persistedState as StoreProps).state.inverterQtyToSave,
                batteryQtyToSave: (persistedState as StoreProps).state.batteryQtyToSave,
                recommendedInverter: (persistedState as StoreProps).state
                  .recommendedInverter,
                
              },
              actions: {
                addGrid: currentState.actions.addGrid,
                addPlace: currentState.actions.addPlace,
                addSystemType: currentState.actions.addSystemType,
                addTotalPower: currentState.actions.addTotalPower,
                addTotalEnergy: currentState.actions.addTotalEnergy,
                addBatteryModel: currentState.actions.addBatteryModel,
                addBatteryQty: currentState.actions.addBatteryQty,
                addBatteryQtyToSave: currentState.actions.addBatteryQtyToSave,
                addFC: currentState.actions.addFC,
                addRecommendedInverter:
                  currentState.actions.addRecommendedInverter,
                addInverterQty: currentState.actions.addInverterQty,
                addInverterQtyToSave: currentState.actions.addInverterQtyToSave,
                reset: currentState.actions.reset,
              },
            },
    }
  )
);
