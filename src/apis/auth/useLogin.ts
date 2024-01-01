import { useMutation } from "@tanstack/react-query";

import useUserStore from "@/stores/user";

import { setLocalStorage } from "@/utils/localStorage";

import postLogin, { LoginRequest } from "./queryFn";

const useLogin = () => {
  const userState = useUserStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: (data) => {
      const {
        token,
        user: { _id: id, email, fullName },
      } = data;
      const { name, nickname } = JSON.parse(fullName);
      const userData = {
        id,
        email,
        name,
        nickname,
        token,
        isLoggedIn: true,
      };
      userState(userData);
      setLocalStorage("token", token);
    },
  });
};

export default useLogin;
