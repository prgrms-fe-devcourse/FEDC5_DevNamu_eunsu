import { useQuery } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import { User } from "@/types/user";

import { authKeys } from "./queryKeyFactory";

const useGetUserInfo = () => {
  const token = getLocalStorage("token", "");
  const { data, isPending } = useQuery<User>({
    queryKey: authKeys.userInfo(token),
  });

  return {
    user: data,
    isPending,
  };
};

export default useGetUserInfo;
