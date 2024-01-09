import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import { putUserInfo, putUserPassword } from "./queryFn";
import auth from "./queryKey";

const usePutProfile = () => {
  const queryClient = useQueryClient();
  const token = getLocalStorage("token", "");

  const { data: userResponse, mutate: profileChangeMutate } = useMutation({
    mutationFn: (userInfo: string) => putUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: auth.userInfo(token).queryKey,
      });
    },
  });

  const { data: passwordResponse, mutate: passwordChangeMutate } = useMutation({
    mutationFn: (password: string) => putUserPassword(password),
  });
  return { profileChangeMutate, passwordChangeMutate, userResponse, passwordResponse };
};

export default usePutProfile;
