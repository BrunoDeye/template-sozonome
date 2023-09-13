import { useQuery } from "@tanstack/react-query";
import { getBatteriesQueryFn } from "../QueryFns/batteryQueryFns";
import { BatteryData } from "../types/BatteryData";

export function useGetBatteries() {
  const { data, isLoading } = useQuery<BatteryData[]>({
    queryKey: ["batteries"],
    queryFn: getBatteriesQueryFn,
  });

  return { data, isLoading };
}