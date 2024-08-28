import { GET_RATINGS_API } from "@/constants/api";
import { axiosTripReportInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import type { FetchRatingsQuery } from "@/types/ratings";

export const getRatings = async (query: FetchRatingsQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_RATINGS_API}${createQueryString(query)}`);
  return res.data;
};