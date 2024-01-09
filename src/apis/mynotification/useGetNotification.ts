import { useQuery } from "@tanstack/react-query";

import myNotification from "./queryKey";

const useGetNotification = () => {
  const { data, isPending } = useQuery(myNotification.allMynotification);
  return {
    myNotifications: data,
    isPending,
  };
};

export default useGetNotification;
