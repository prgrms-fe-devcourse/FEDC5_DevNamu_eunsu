import { RegisterRequest } from "@/apis/auth/queryFn.ts";
import useChangeThread from "@/hooks/api/useChangeThread.ts";
import useUserListByDB from "@/hooks/api/useUserListByDB.ts";
import useLogin from "@/apis/auth/useLogin.ts";
import usePostLogout from "@/apis/auth/usePostLogout.ts";
import useRegister from "@/apis/auth/useRegister.ts";

const useUpdateUserList = () => {
  const { mutateAsync, isError, isSuccess, error } = useRegister();
  const { changeThread } = useChangeThread({
    nickname: "데브코스 관리자",
    postId: import.meta.env.VITE_ADMIN_DB,
  });
  const { login } = useLogin({ toggleOpen: () => {} });
  const { userListByDB } = useUserListByDB();
  const { mutate: logoutMutate } = usePostLogout();

  const updateUserList = async (body: RegisterRequest) => {
    const {
      user: { _id },
    } = await mutateAsync(body);

    const { name } = body.fullName;

    const newUserList = userListByDB.map((user) =>
      user.name === name ? { ...user, userId: _id } : user,
    );

    await login({
      email: import.meta.env.VITE_ADMIN_ID,
      password: import.meta.env.VITE_ADMIN_PW,
    });

    await changeThread({
      anonymous: false,
      content: JSON.stringify(newUserList),
    });

    logoutMutate();

    return name;
  };

  return {
    updateUserList,
    isRegisterSuccess: isSuccess,
    isRegisterError: isError,
    registerError: error,
  };
};

export default useUpdateUserList;
