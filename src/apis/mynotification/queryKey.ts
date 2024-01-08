import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getMyNotification, getMyMentioned } from "./queryFn";

const myNotification = createQueryKeys("myNotification", {
  allMynotification: {
    queryKey: ["my-notifications"],
    queryFn: () => getMyNotification(),
  },
  mentioned: {
    queryKey: ["my-mention"],
    queryFn: () => getMyMentioned(),
  },
});

export default myNotification;
