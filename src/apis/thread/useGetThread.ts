import { useQuery } from "@tanstack/react-query";

import { Thread } from "@/types/thread.ts";

import threads from "@/apis/thread/queryKey.ts";

const useGetThread = (threadId: string | undefined) => {
  const { data, ...rest } = useQuery<Thread>(threads.threadDetail(threadId));

  return { thread: data, ...rest };
};

export default useGetThread;
