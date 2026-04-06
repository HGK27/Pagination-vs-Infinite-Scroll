import React, { useEffect, useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useInView } from "react-intersection-observer";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import PostCard from "../../components/molecules/PostCard/PostCard";
import type { Post } from "../../types/index";
import styles from "./ScrollingPage.module.scss";

const LIMIT = 10;
const ITEM_HEIGHT = 170;

const InfinitePostsPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(LIMIT);

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages],
  );

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const post: Post = posts[index];

      if (!post) return null;

      if (index === posts.length - 1) {
        return (
          <div style={style}>
            <div ref={ref} />
            <PostCard post={post} onSelect={(id) => console.log(id)} />
          </div>
        );
      }

      return (
        <div style={style}>
          <PostCard post={post} onSelect={(id) => console.log(id)} />
        </div>
      );
    },
    [posts, ref],
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Hata oluştu!</div>;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Infinite Scroll</h1>
        <List
          className={styles.listStyle}
          height={window.innerHeight - 100} // görünür alan yüksekliği
          width="100%"
          itemCount={posts.length}
          itemSize={ITEM_HEIGHT} // FixedSizeList'te her item aynı yükseklik
        >
          {Row}
        </List>
      </div>
      {isFetchingNextPage && <div>Yükleniyor...</div>}
      {!hasNextPage && <div>Tüm postlar yüklendi 🎉</div>}
    </main>
  );
};

export default InfinitePostsPage;
