import api from "@/services/api";
import { CalculateBatteriesDataType } from "../types/CalculateBatteriesDataType";

export const getBatteriesQueryFn = async () =>
  api.get(`/batteries`).then((res) => res.data);

// export const getBatteryQueryFn = async (data) =>
//   api.post(`/filtered-battery`, data).then((res) => res.data);

export const calculateBatteriesMutationFn = (data: CalculateBatteriesDataType) =>
  api.post(`/calculate-batteries`, data).then((res) => res.data);

export const calculateBatteriesQueryFn = (data: CalculateBatteriesDataType) =>
  api.post(`/calculate-batteries`, data).then((res) => res.data);

// export const compareBatteriesMutateFn = (data) =>
//   api.post(`/compare-batteries`, data).then((res) => res.data);