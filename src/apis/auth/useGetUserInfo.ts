import { useQuery } from "@tanstack/react-query";


import auth from "./queryKey";

const useGetUserInfo = (isInvalidUserId: boolean, token: string) => {
  return useQuery(auth.userInfo(isInvalidUserId, token));
};

export default useGetUserInfo;
