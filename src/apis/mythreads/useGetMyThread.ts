import { useQuery } from "@tanstack/react-query";

import { getMyThreads } from "./queryFn";

const useGetMyThread = (userId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["my-threads", userId],
    queryFn: () => getMyThreads(userId),
  });
  return {
    myThreads: data,
    isThreadPending: isPending,
  };
};

export default useGetMyThread;
