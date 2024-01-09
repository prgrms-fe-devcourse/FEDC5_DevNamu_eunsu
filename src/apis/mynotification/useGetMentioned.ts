import { useQuery } from "@tanstack/react-query";

import myNotification from "./queryKey";

const useGetMentioned = () => {
  const { data, isPending } = useQuery(myNotification.mentioned);
  return {
    myMentions: data,
    isPending,
  };
};

export default useGetMentioned;
