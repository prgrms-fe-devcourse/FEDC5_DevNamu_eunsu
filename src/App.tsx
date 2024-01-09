import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import MyThreadsPage from "./pages/MyThreads";
import MyNotificationsPage from "./pages/MyNotifications";
import NotFoundPage from "./pages/NotFound";
import Layout from "./components/Layout";
import ExThreadDetailView from "./components/Demo/ExThreadDetailView";

import ExEditorTextArea from "@/components/Demo/ExEditorTextArea.tsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="channels/*" element={<HomePage />} />
        <Route path="my-threads" element={<MyThreadsPage />} />
        <Route path="my-notifications" element={<MyNotificationsPage />} />
        {/*TODO : [24/1/8] 에디터 데모 다음 머지 시 삭제 (이번에는 PR 없이 머지하기로 해서 남겨두겠습니다) */}
        <Route path="demo" element={<ExEditorTextArea />} />
        <Route path="detail" element={<ExThreadDetailView />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
