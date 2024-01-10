import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getLocalStorage } from "@/utils/localStorage";

import { postUserProfileImage, putUserInfo, putUserPassword } from "./queryFn";
import auth from "./queryKey";

const usePutProfile = () => {
  const queryClient = useQueryClient();
  const token = getLocalStorage("token", "");

  const { mutateAsync: updateUserName } = useMutation({
    mutationFn: (userInfo: string) => putUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: auth.userInfo(token).queryKey,
      });
    },
  });

  const { mutateAsync: updatePassword } = useMutation({
    mutationFn: (password: string) => putUserPassword(password),
  });

  const { mutateAsync: updateProfileImage } = useMutation({
    mutationFn: (image: string) => postUserProfileImage(image),
  });

  const updateAllProfile = async (userInfo: string, password: string) => {
    await updateUserName(userInfo);
    await updatePassword(password);
  };

  return {
    updateUserName,
    updatePassword,
    updateAllProfile,
    updateProfileImage,
  };
};

export default usePutProfile;
