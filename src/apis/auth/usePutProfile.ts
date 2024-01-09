import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import { postUserProfileImage, putUserInfo, putUserPassword } from "./queryFn";
import auth from "./queryKey";

const usePutProfile = () => {
  const queryClient = useQueryClient();
  const token = getLocalStorage("token", "");

  const { data: userResponse, mutate: updateUserName } = useMutation({
    mutationFn: (userInfo: string) => putUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: auth.userInfo(token).queryKey,
      });
    },
  });

  const { data: passwordResponse, mutate: updatePassword } = useMutation({
    mutationFn: (password: string) => putUserPassword(password),
  });

  const { data: imageResponse, mutate: updateProfileImage } = useMutation({
    mutationFn: (image: string) => postUserProfileImage(image),
  });

  return {
    updateUserName,
    updatePassword,
    updateProfileImage,
    imageResponse,
    userResponse,
    passwordResponse,
  };
};

export default usePutProfile;
