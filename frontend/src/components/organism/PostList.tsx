// src/components/PostList/PostList.tsx
import { memo, useCallback } from "react";
import type { Post } from "../../types";
import PostCard from "../molecules/PostCard/PostCard";

interface Props {
  posts: Post[];
}

const PostList = memo(({ posts }: Props) => {
  // useCallback — her render'da yeni fonksiyon oluşmasın
  // PostCard'ın memo'su bu sayede anlam kazanır
  const handleSelect = useCallback((id: number) => {
    console.log("Selected post:", id);
  }, []); // dependency yok, bir kez oluşturulur

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onSelect={handleSelect} />
      ))}
    </div>
  );
});

PostList.displayName = "PostList";
export default PostList;
