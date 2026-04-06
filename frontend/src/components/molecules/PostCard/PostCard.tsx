// src/components/PostCard/PostCard.tsx
import { memo } from "react";
import type { Post } from "../../../types";
import styles from "./PostCard.module.scss";

interface Props {
  post: Post;
  onSelect: (id: number) => void; // callback memo için useCallback ile gelecek
}

const PostCard = memo(({ post, onSelect }: Props) => {
  return (
    <article className={styles.card} onClick={() => onSelect(post.id)}>
      <div className={styles.image}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        <p>{post.content.slice(0, 150)}...</p>
      </div>
    </article>
  );
});

PostCard.displayName = "PostCard"; // React DevTools için
export default PostCard;
