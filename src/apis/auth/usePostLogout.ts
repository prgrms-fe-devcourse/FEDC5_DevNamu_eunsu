import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";

import { postLogout } from "./queryFn";
import auth from "./queryKey";

const usePostLogout = () => {
  const queryClient = useQueryClient();
  const token = getLocalStorage("token", "");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: auth.userInfo(token).queryKey });
      removeLocalStorage("token");
      if (pathname !== "/") navigate("/");
    },
  });

  return { logout: mutateAsync };
};

export default usePostLogout;
