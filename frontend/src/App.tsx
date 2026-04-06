import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/organism/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostsPage from "./pages/pagination/PostPage";
import InfinitePostsPage from "./pages/scrolling/ScrollingPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // hata durumunda 2 kez daha dene
      refetchOnWindowFocus: false, // tab değişince istek atma
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/infinite" element={<InfinitePostsPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
