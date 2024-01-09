import { useMutation } from "@tanstack/react-query";

import { putUserInfo, putUserPassword } from "./queryFn";

const usePutProfile = () => {
  const { data: userResponse, mutate: profileChangeMutate } = useMutation({
    mutationFn: (userInfo: string) => putUserInfo(userInfo),
  });

  const { data: passwordResponse, mutate: passwordChangeMutate } = useMutation({
    mutationFn: (password: string) => putUserPassword(password),
  });
  return { profileChangeMutate, passwordChangeMutate, userResponse, passwordResponse };
};

export default usePutProfile;
