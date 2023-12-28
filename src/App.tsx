import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/Home";
import MyThreadsPage from "./pages/MyThreads";
import MyNotificationsPage from "./pages/MyNotifications";
import NotFoundPage from "./pages/NotFound";

export const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="my-threads" element={<MyThreadsPage />} />
        <Route path="my-notifications" element={<MyNotificationsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
