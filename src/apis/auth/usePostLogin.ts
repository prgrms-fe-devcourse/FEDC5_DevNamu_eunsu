import { useMutation } from "@tanstack/react-query";

import { setLocalStorage } from "@/utils/localStorage";

import { postLogin, LoginRequest } from "./queryFn";

const usePostLogin = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: ({ token }) => {
      setLocalStorage("token", token);
    },
  });

  return { login: mutateAsync };
};

export default usePostLogin;
