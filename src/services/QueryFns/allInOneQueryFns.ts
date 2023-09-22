import api from "@/services/api";

export const getAllInOnesQueryFn = async () =>
  api.get(`/allInOnes`).then((res) => res.data);