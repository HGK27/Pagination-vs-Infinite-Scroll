// src/pages/PostsPage/PostsPage.tsx
import { useState, useCallback, useMemo } from "react";
import { usePosts } from "../../hooks/usePosts";
import PostList from "../../components/organism/PostList";
import Pagination from "../../components/molecules/Pagination/Pagination";
import styles from "./PostPage.module.scss";

const LIMIT = 10;

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = usePosts(page, LIMIT);

  // useMemo — totalPages her render'da yeniden hesaplanmasın
  const totalPages = useMemo(() => {
    if (!data?.totalCount) return 1;
    return Math.ceil(data.totalCount / LIMIT);
  }, [data?.totalCount]);

  // useCallback — Pagination'a prop olarak geçecek, stabil referans
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Hata oluştu!</div>;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* isFetching: sayfa geçişinde arka planda istek varken göster */}
        {isFetching && (
          <div className="fetching-indicator">Güncelleniyor...</div>
        )}
        <h1 className={styles.pageTitle}>Posts</h1>
        <PostList posts={data?.data ?? []} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default PostsPage;
