import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/Home";
import MyThreadsPage from "./pages/MyThreads";
import MyNotificationsPage from "./pages/MyNotifications";
import NotFoundPage from "./pages/NotFound";
import Layout from "./components/Layout";
import useUserStore from "./stores/user";
import useGetUserInfo from "./apis/auth/useGetUserInfo";
import { getLocalStorage } from "./utils/localStorage";

const App = () => {
  const { user, updateUser } = useUserStore();
  const token = getLocalStorage("token", "");
  const userInfo = useGetUserInfo(user === null, token);

  useEffect(() => {
    if (!userInfo) return;
    if (!user) updateUser(userInfo);
  }, [userInfo, updateUser, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="channels/*" element={<HomePage />} />
          <Route path="my-threads" element={<MyThreadsPage />} />
          <Route path="my-notifications" element={<MyNotificationsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
