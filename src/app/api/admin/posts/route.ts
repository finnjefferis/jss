import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getAllPosts, savePost, deletePost, type BlogPost } from "@/lib/posts";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();
  return NextResponse.json(getAllPosts());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return unauthorized();

  const body = await req.json();
  const { title, slug, description, date, readTime, tags, content } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "title, slug, and content are required" },
      { status: 400 },
    );
  }

  const post: BlogPost = {
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    title,
    description: description || "",
    date: date || new Date().toISOString().split("T")[0],
    readTime: readTime || estimateReadTime(content),
    tags: tags || [],
    content,
  };

  savePost(post);
  return NextResponse.json(post, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return unauthorized();

  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const deleted = deletePost(slug);
  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
