import { useMutation } from "@tanstack/react-query";

import { postRegister, RegisterRequest } from "@/apis/auth/queryFn.ts";
import useChangeThread from "@/hooks/api/useChangeThread.ts";
import useUserListByDB from "@/hooks/api/useUserListByDB.ts";
import useLogin from "@/apis/auth/useLogin.ts";

const useUpdateUserList = () => {
  const { mutateAsync, isError, isSuccess, error } = useMutation({
    mutationFn: (body: RegisterRequest) => postRegister(body),
  });
  const { changeThread } = useChangeThread({
    nickname: "데브코스 관리자",
    postId: import.meta.env.VITE_ADMIN_DB,
  });
  const { mutateAsync: loginMutate } = useLogin({ toggleOpen: () => {} });
  const { userListByDB } = useUserListByDB();

  const updateUserList = async (body: RegisterRequest) => {
    const {
      user: { _id },
    } = await mutateAsync(body);

    const { name } = body.fullName;

    const newUserListByDB = [...userListByDB];
    const targetUser = newUserListByDB.find((defaultUser) => defaultUser.name === name);

    targetUser && (targetUser.userId = _id);

    await loginMutate({
      email: import.meta.env.VITE_ADMIN_ID,
      password: import.meta.env.VITE_ADMIN_PW,
    });

    await changeThread({
      anonymous: false,
      content: JSON.stringify(newUserListByDB),
    });

    // TODO : [24/1/9] admin 로그아웃 추가
  };

  return {
    updateUserList,
    isRegisterSuccess: isSuccess,
    isRegisterError: isError,
    registerError: error,
  };
};

export default useUpdateUserList;
