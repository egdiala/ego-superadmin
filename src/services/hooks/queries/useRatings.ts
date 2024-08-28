import { useQuery } from "@tanstack/react-query";
import { getRatings } from "@/services/apis/ratings";
import { GET_RATINGS } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { FetchedRating, FetchedRatingCountStatus, FetchRatingsQuery } from "@/types/ratings";

export const useGetRatings = (query: FetchRatingsQuery) => {
  return useQuery({
    queryKey: [GET_RATINGS, query],
    queryFn: () => getRatings(query),
    select: (res) => res?.data as FetchedRating[] | FetchedRatingCountStatus,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};