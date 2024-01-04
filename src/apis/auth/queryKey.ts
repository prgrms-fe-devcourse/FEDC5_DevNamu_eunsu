import { createQueryKeys } from "@lukemorales/query-key-factory";

import { parseFullName } from "@/utils/parsingJson";

import { getUserInfo } from "./queryFn";

const auth = createQueryKeys("auth", {
  userInfo: (token: string) => ({
    queryKey: [token],
    queryFn: async () => {
      const user = getUserInfo();

      if (!user) return null;

      const { nickname, name } = parseFullName((await user).fullName);

      return {
        ...(await user),
        name,
        nickname,
      };
    },
    enabled: !!token,
  }),
});

export default auth;
