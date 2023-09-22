import { useQuery } from "@tanstack/react-query";
import { getAllInOnesQueryFn } from "../QueryFns/allInOneQueryFns";
import { AllInOneData } from "../types/AllInOneData";

export function useGetAllInOnes() {
  const { data, isLoading, isError } = useQuery<AllInOneData[]>({
    queryKey: ["allInOnes"],
    queryFn: getAllInOnesQueryFn,
  });

  return { data, isLoading, isError };
}