import { useMutation } from "@tanstack/react-query";

import { RegisterRequest, postRegister } from "@/apis/auth";

const useRegister = () => {
  return useMutation({
    mutationFn: (body: RegisterRequest) => postRegister(body),
  });
};

export default useRegister;
