import { useMutation } from "@tanstack/react-query";

import { setLocalStorage } from "@/utils/localStorage";

import { postLogin, LoginRequest } from "./queryFn";

interface Props {
  toggleOpen: () => void;
}

const usePostLogin = ({ toggleOpen }: Props) => {
  const { mutateAsync } = useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: ({ token }) => {
      setLocalStorage("token", token);
      toggleOpen();
    },
  });

  return { login: mutateAsync };
};

export default usePostLogin;
