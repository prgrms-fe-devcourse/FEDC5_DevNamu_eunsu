import { useMutation } from "@tanstack/react-query";

import { setLocalStorage } from "@/utils/localStorage";

import { postLogin, LoginRequest } from "./queryFn";

interface Props {
  toggleOpen: (open: boolean) => void;
}

const useLogin = ({ toggleOpen }: Props) => {
  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: ({ token }) => {
      setLocalStorage("token", token);
      toggleOpen(false);
    },
  });
};

export default useLogin;
