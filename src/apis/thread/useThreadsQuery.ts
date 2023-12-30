import { useQuery } from "@tanstack/react-query";

import threads from "./queryKey";

const useThreadsQuery = (id: string) => {
  const { data, isLoading, isError, error } = useQuery(threads.threadsByChannel(id));

  return {
    threads: data,
    isLoading,
    isError,
    error,
  };
};

export default useThreadsQuery;
