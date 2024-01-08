import { useQuery } from "@tanstack/react-query";

import { getMyNotification } from "./queryFn";

const useGetmyNotification = () => {
  const { data, isPending } = useQuery({
    queryKey: ["my-notifications"],
    queryFn: () => getMyNotification(),
  });
  return {
    myNotifications: data,
    isPending,
  };
};

export default useGetmyNotification;
