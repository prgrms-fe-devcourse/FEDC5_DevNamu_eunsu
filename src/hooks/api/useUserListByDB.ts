import { useEffect, useState } from "react";

import useGetThread from "@/apis/thread/useGetThread.ts";

export interface UserDBProps {
  name: string;
  userId: string;
  slackId: string;
}
const useUserListByDB = () => {
  const [userListByDB, setUserListByDB] = useState<UserDBProps[]>([]);
  const { thread: db, isLoading, isError, error } = useGetThread(import.meta.env.VITE_ADMIN_DB);

  useEffect(() => {
    try {
      if (!db) return;
      if (!db.title) return;

      setUserListByDB(JSON.parse(JSON.parse(db.title).content));
    } catch (e) {
      console.log("유저 리스트를 불러오는데 실패했습니다.");
    }
  }, [db]);

  return { userListByDB, isLoading, isError, error };
};

export default useUserListByDB;
