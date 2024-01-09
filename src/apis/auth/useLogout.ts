import { useMutation } from "@tanstack/react-query";

import { postLogout } from "./queryFn";

const useLogout = () => {
  return useMutation({
    mutationFn: () => postLogout(),
  })
};

export default useLogout;
