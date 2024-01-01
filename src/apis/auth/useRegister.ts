import { useMutation } from "@tanstack/react-query";

import { postRegister, RegisterRequest } from "./queryFn";

const useRegister = () => {
  return useMutation({
    mutationFn: (body: RegisterRequest) => postRegister(body),
  });
};

export default useRegister;
