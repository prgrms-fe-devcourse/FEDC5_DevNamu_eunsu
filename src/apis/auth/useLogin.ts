import { useMutation } from "@tanstack/react-query";

import { setLocalStorage } from "@/utils/localStorage";

import { postLogin, LoginRequest } from "./queryFn";

interface Props {
  toggleOpen: (open: boolean) => void;
}

const useLogin = ({ toggleOpen }: Props) => {
  const { mutateAsync } = useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: ({ token }) => {
      setLocalStorage("token", token);
      toggleOpen(false);
    },
  });

  return { login: mutateAsync };
};

export default useLogin;
