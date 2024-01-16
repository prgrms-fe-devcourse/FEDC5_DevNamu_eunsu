import { useMutation } from "@tanstack/react-query";

import { setLocalStorage } from "@/utils/localStorage";

import { postLogin, LoginRequest } from "./queryFn";

const usePostLogin = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: ({ token }) => {
      setLocalStorage("token", token);
      // TODO: 로그인, 로그아웃 리다이랙션 컴포넌트 만들기 (24.01.15)
      location.pathname = "/";
    },
  });

  return { login: mutateAsync };
};

export default usePostLogin;
