import { useQuery } from "@tanstack/react-query";

import { Thread } from "@/types/thread.ts";

import threads from "./queryKey";

const useGetThreads = (channelId: string | undefined) => {
  const { data, ...rest } = useQuery<Thread[]>(threads.threadsByChannel(channelId));

  return { threads: data?.slice().reverse(), ...rest };
};

export default useGetThreads;
