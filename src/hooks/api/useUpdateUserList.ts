import useChangeThread from "@/hooks/api/useChangeThread.ts";
import useUserListByDB from "@/hooks/api/useUserListByDB.ts";
import usePostLogin from "@/apis/auth/usePostLogin";
import usePostLogout from "@/apis/auth/usePostLogout.ts";

const useUpdateUserList = () => {
  const { changeThread } = useChangeThread({
    nickname: "데브코스 관리자",
    postId: import.meta.env.VITE_ADMIN_DB,
    channelId: import.meta.env.VITE_ADMIN_CHANNEL,
  });

  const { login } = usePostLogin({ toggleOpen: () => {} });
  const { userListByDB } = useUserListByDB();
  const { mutate: logout } = usePostLogout();

  const updateUserList = async ({ _id, name }: { _id: string; name: string }) => {
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

    logout();

    return name;
  };

  return {
    updateUserList,
  };
};

export default useUpdateUserList;
