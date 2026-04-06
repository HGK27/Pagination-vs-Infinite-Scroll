// src/api/posts.ts
import axiosInstance from "./axiosInstance";
import type { Post, PaginatedResponse } from "../types";

export const fetchPosts = async (
  page: number,
  limit: number,
): Promise<PaginatedResponse<Post>> => {
  const response = await axiosInstance.get("/posts", {
    params: { _page: page, _limit: limit },
  });

  return {
    data: response.data,
    totalCount: Number(response.headers["x-total-count"]),
  };
};
