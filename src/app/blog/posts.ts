import { getAllPosts, type BlogPost } from "@/lib/posts";

export type { BlogPost };

export const POSTS: BlogPost[] = getAllPosts();
