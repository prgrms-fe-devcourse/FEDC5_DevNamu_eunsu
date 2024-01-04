import { useMutation } from "@tanstack/react-query";

import useUserStore from "@/stores/user";

import { setLocalStorage } from "@/utils/localStorage";

import { postLogin, LoginRequest, AuthResponse } from "./queryFn";

interface Props {
  toggleOpen: (open: boolean) => void;
}

const useLogin = ({ toggleOpen }: Props) => {
  const { updateUser } = useUserStore();

  const parseUser = (data: AuthResponse) => {
    const {
      token,
      user: { _id: id, email, fullName },
    } = data;
    const { name, nickname } = JSON.parse(fullName);
    return {
      id,
      email,
      name,
      nickname,
      token,
      isLoggedIn: true,
    };
  };

  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: (data) => {
      const user = parseUser(data);
      updateUser(user);
      setLocalStorage("token", user.token);
    },
    onSettled: () => toggleOpen(false),
  });
};

export default useLogin;
