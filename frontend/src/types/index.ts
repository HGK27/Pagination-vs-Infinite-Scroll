// src/types/index.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  city: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}
