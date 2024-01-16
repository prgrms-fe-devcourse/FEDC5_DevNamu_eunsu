import * as Sentry from "@sentry/react";

import { log } from "@/utils/logger.ts";

import usePostRegister from "@/apis/auth/usePostRegister.ts";
import { RegisterRequest } from "@/apis/auth/queryFn.ts";
import useUpdateUserList from "@/hooks/api/useUpdateUserList.ts";

const useRegister = () => {
  const { mutateAsync, isSuccess, ...props } = usePostRegister();
  const { updateUserList } = useUpdateUserList();

  const register = async (registerForm: RegisterRequest) => {
    try {
      const {
        user: { _id },
      } = await mutateAsync(registerForm);

      const { name } = registerForm.fullName;

      await updateUserList({ _id, name });

      return name;
    } catch (error) {
      log("error", "Error reading from Register:", error);
      Sentry.captureException(error);
      throw new Error();
    }
  };

  return {
    register,
    isRegisterSuccess: isSuccess,
    ...props,
  };
};
export default useRegister;
