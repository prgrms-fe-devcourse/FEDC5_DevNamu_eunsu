import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getUserInfo } from "./queryFn";

const auth = createQueryKeys("auth", {
  userInfo: (isInvalidUserId, token) => ({
    queryKey: [token],
    queryFn: getUserInfo,
    enabled: isInvalidUserId && token !== "",
  }),
});

export default auth;
