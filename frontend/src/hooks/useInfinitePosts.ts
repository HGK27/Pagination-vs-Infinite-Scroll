// src/hooks/useInfinitePosts.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export const useInfinitePosts = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["posts-infinite"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.totalCount / limit);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined; // undefined → daha sayfa yok
    },
    staleTime: 1000 * 60 * 5,
  });
};
