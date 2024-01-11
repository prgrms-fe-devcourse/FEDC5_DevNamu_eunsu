import { useQuery } from "@tanstack/react-query";

import myNotification from "./queryKey";

import useGetUserInfo from "@/apis/auth/useGetUserInfo.ts";

const useGetMentioned = () => {
  const { user } = useGetUserInfo();
  const { data, isPending } = useQuery(myNotification.mentioned);

  return {
    myMentions: data?.filter((mention) => mention.sender._id !== user?._id),
    isPending,
  };
};

export default useGetMentioned;
