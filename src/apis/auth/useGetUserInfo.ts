import { useQuery } from "@tanstack/react-query";

import { parseFullName } from "@/utils/parsingJson";

import auth from "./queryKey";

const useGetUserInfo = (isInvalidUserId: boolean, token: string) => {
  const { data, isLoading } = useQuery(auth.userInfo(isInvalidUserId, token));
  if (!data || isLoading) return;

  const { _id: id, email, fullName } = data;
  const { name, nickname } = parseFullName(fullName);
  return { id, email, name, nickname, token, isLoggedIn: true };
};

export default useGetUserInfo;
