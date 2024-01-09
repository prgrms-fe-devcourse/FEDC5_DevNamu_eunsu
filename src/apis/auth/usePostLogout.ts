import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";

import { postLogout } from "./queryFn";
import auth from "./queryKey";

const usePostLogout = () => {
  const queryClient = useQueryClient();
  const token = getLocalStorage("token", "");

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: auth.userInfo(token).queryKey });
      removeLocalStorage("token");
    },
  });
};

export default usePostLogout;
