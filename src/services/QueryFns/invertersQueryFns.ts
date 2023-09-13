import api from "@/services/api";
import { CalculateInvertersReqType } from "../types/CalculateInvertersReqType";

export const getInvertersQueryFn = async () =>
  api.get(`/inverters`).then((res) => res.data);

export const calculateInvertersQueryFn = (data: CalculateInvertersReqType) =>
  api.post(`/calculate-inverters`, data).then((res) => res.data);