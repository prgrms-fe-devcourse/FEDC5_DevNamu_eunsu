import { useQuery } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import auth from "./queryKey";

const useGetUserInfo = () => {
  const token = getLocalStorage("token", "");
  const { data: user, isPending } = useQuery(auth.userInfo(token));

  return {
    user,
    isLoggedIn: !!user,
    hasNickname: !!user?.nickname,
    isPending,
  };
};

export default useGetUserInfo;
