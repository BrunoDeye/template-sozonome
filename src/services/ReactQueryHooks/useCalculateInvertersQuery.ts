import { useQuery } from "@tanstack/react-query";
import { calculateInvertersQueryFn } from "../QueryFns/invertersQueryFns";
import { CalculateInvertersReqType } from "../types/CalculateInvertersReqType";
import { InverterData } from "../types/InverterData";
import { cache } from 'react';

export function useCalculateInvertersQuery(requestData: CalculateInvertersReqType) {
  const {
    data: invertersList,
    isLoading,
    isError,
  } = useQuery<InverterData[]>({
    queryKey: ["calculateInverters", requestData],
    queryFn: () => calculateInvertersQueryFn(requestData),
    
  });

  return { invertersList, isLoading, isError};
}