import { BrowserRouter, Route, Routes } from "react-router-dom";

import Demo from "@/components/Demo.tsx";

import HomePage from "./pages/Home";
import MyThreadsPage from "./pages/MyThreads";
import MyNotificationsPage from "./pages/MyNotifications";
import NotFoundPage from "./pages/NotFound";
import Layout from "./components/Layout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="channels/*" element={<HomePage />} />
        <Route path="my-threads" element={<MyThreadsPage />} />
        <Route path="my-notifications" element={<MyNotificationsPage />} />
        {/*TODO : [24/1/4] merge 시 데모 삭제 */}
        <Route path="demo" element={<Demo />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
