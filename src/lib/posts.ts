import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export function getAllPosts(): BlogPost[] {
  ensureDir();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
        return JSON.parse(raw) as BlogPost;
      } catch {
        return null;
      }
    })
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | null {
  ensureDir();
  const file = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as BlogPost;
  } catch {
    return null;
  }
}

export function savePost(post: BlogPost): void {
  ensureDir();
  const file = path.join(POSTS_DIR, `${post.slug}.json`);
  fs.writeFileSync(file, JSON.stringify(post, null, 2), "utf-8");
}

export function deletePost(slug: string): boolean {
  const file = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return false;
  fs.unlinkSync(file);
  return true;
}
