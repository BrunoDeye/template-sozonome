import { useMutation } from "@tanstack/react-query";
import { calculateBatteriesMutationFn } from "../QueryFns/batteryQueryFns";

export function useCalculateBatteriesMutation() {
  const calculateBatteriesMutation = useMutation({
    mutationFn: calculateBatteriesMutationFn,
  });

  return calculateBatteriesMutation;
}