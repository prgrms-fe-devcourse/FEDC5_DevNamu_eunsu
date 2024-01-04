import { useQuery } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import auth from "./queryKey";

const useGetUserInfo = () => {
  const token = getLocalStorage("token", "");
  const { data, isPending } = useQuery(auth.userInfo(token));

  return {
    user: data,
    isPending,
  };
};

export default useGetUserInfo;
