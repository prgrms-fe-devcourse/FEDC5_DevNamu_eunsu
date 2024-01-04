import { useQuery } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import auth from "./queryKey";

const useGetUserInfo = () => {
  const token = getLocalStorage("token", "");
  return useQuery(auth.userInfo(token));
};

export default useGetUserInfo;
