import { useQuery } from "@tanstack/react-query";

import { getMyThreads } from "@/apis/myThreads";

const useGetMyThread = (userId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["my-threads", userId],
    queryFn: () => getMyThreads(userId),
  });

  return {
    myThreads: data,
    isPending,
  };
};

export default useGetMyThread;
