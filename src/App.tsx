import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/Home";
import MyThreadsPage from "./pages/MyThreads";
import MyNotificationsPage from "./pages/MyNotifications";
import NotFoundPage from "./pages/NotFound";
import Layout from "./components/Layout";

import ExMentionInput from "@/components/Demo/ExMentionInput.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="my-threads" element={<MyThreadsPage />} />
          <Route path="my-notifications" element={<MyNotificationsPage />} />
          <Route path="demo" element={<ExMentionInput />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
