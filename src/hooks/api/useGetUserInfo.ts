import { useQuery } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import { authKeys } from "./queryKeyFactory";

const useGetUserInfo = () => {
  const token = getLocalStorage("token", "");
  const { data, isPending } = useQuery({
    queryKey: authKeys.userInfo(token),
  });

  return {
    user: data,
    isPending,
  };
};

export default useGetUserInfo;
