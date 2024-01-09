import { useQuery } from "@tanstack/react-query";

import { Thread } from "@/types/thread.ts";

import threads from "@/apis/thread/queryKey.ts";

const useGetThread = (threadId: string | undefined) => {
  const { data, isLoading, isError, error } = useQuery<Thread>(threads.threadDetail(threadId));

  return {
    thread: data,
    isLoading,
    isError,
    error,
  };
};

export default useGetThread;
