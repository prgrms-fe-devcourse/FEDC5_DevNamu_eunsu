import { useQuery } from "@tanstack/react-query";

import { getMyThreads } from "./queryFn";

const useGetMyThread = (userId: string) => {
  return useQuery({
    queryKey: ["my-threads", userId],
    queryFn: () => getMyThreads(userId),
  });
};

export default useGetMyThread;
