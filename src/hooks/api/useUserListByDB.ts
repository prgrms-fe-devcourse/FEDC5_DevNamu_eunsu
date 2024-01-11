import { useEffect, useState } from "react";

import useGetThread from "@/apis/thread/useGetThread.ts";

export interface UserDBProps {
  name: string;
  userId: string;
}
const useUserListByDB = () => {
  const [userListByDB, setUserListByDB] = useState<UserDBProps[]>([]);
  const { thread: db, isLoading, isError, error } = useGetThread(import.meta.env.VITE_ADMIN_DB);

  useEffect(() => {
    if (!db) return;
    if (!db.title) return;

    setUserListByDB(JSON.parse(JSON.parse(db.title).content));
  }, [db]);

  return { userListByDB, isLoading, isError, error };
};

export default useUserListByDB;
