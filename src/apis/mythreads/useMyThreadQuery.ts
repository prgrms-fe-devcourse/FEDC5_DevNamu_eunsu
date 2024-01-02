import { useQuery } from "@tanstack/react-query";

import { getMyThreads } from "./queryFn";

const useMyThreadQuery = (userId: string) => {
  const result = useQuery({
    queryKey: ["my-threads", userId],
    queryFn: () => getMyThreads(userId),
  });
  return result;
};

export default useMyThreadQuery;
