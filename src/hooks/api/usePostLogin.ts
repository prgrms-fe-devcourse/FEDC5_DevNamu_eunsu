import { useMutation } from "@tanstack/react-query";

import { LoginRequest, postLogin } from "@/apis/auth";

import { setLocalStorage } from "@/utils/localStorage";

interface Props {
  toggleOpen: (open: boolean) => void;
}

const useLogin = ({ toggleOpen }: Props) => {
  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: (data) => {
      setLocalStorage("token", data?.token);
    },
    onSettled: () => toggleOpen(false),
  });
};

export default useLogin;
