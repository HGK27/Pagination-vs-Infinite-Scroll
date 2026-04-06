// src/hooks/usePosts.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export const usePosts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["posts", page, limit], // page değişince yeni istek
    queryFn: () => fetchPosts(page, limit),
    placeholderData: keepPreviousData, // sayfa değişirken eski data göster
    staleTime: 1000 * 60 * 5, // 5 dk cache'te tut
    gcTime: 1000 * 60 * 10, // 10 dk garbage collect
  });
};
