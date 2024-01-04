import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getUserInfo } from "./queryFn";

const auth = createQueryKeys("auth", {
  userInfo: (token: string) => ({
    queryKey: [token],
    queryFn: getUserInfo,
    enabled: !!token
  }),
});

export default auth;
