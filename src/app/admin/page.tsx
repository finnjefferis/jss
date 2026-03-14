"use client";

import { useState, useEffect, useCallback } from "react";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
};

// ---------- API helpers ----------

async function api(path: string, opts?: RequestInit) {
  const res = await fetch(path, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

function login(password: string) {
  return api("/api/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}

function logout() {
  return api("/api/admin/auth", { method: "DELETE" });
}

function fetchPosts(): Promise<BlogPost[]> {
  return api("/api/admin/posts");
}

function savePostApi(post: Partial<BlogPost>) {
  return api("/api/admin/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}

function deletePostApi(slug: string) {
  return api("/api/admin/posts", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  });
}

// ---------- Tag options ----------

const TAG_OPTIONS = [
  "Web Design",
  "SEO",
  "Performance",
  "Small Business",
  "E-Commerce",
  "Branding",
  "AI",
  "Development",
  "Case Study",
  "Tips",
  "News",
];

// ---------- Components ----------

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(password);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-zinc-900 border border-zinc-800 rounded-xl p-8"
      >
        <h1 className="text-xl font-bold text-zinc-100">Admin Login</h1>
        {error && (
          <p className="text-sm text-red-400 bg-red-950/50 rounded-lg p-3">
            {error}
          </p>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-coral-600 hover:bg-coral-500 disabled:opacity-50 px-4 py-2.5 text-sm font-medium text-white transition-colors"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [date, setDate] = useState(
    post?.date ?? new Date().toISOString().split("T")[0],
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags ?? []);
  const [content, setContent] = useState(post?.content ?? "");
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title
  useEffect(() => {
    if (!post) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, ""),
      );
    }
  }, [title, post]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await savePostApi({
        title,
        slug,
        description,
        date,
        tags: selectedTags,
        content,
      });
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-100">
          {post ? "Edit Post" : "New Post"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title || !slug}
            className="rounded-lg bg-coral-600 hover:bg-coral-500 disabled:opacity-50 px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-950/50 rounded-lg p-3">
          {error}
        </p>
      )}

      {/* Meta fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            Slug
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setSelectedTags((prev) =>
                      active ? prev.filter((t) => t !== tag) : [...prev, tag],
                    )
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-coral-600 text-white"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500 resize-none"
        />
      </div>

      {/* Content editor with tabs */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <button
            onClick={() => setTab("edit")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "edit"
                ? "bg-zinc-700 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Edit HTML
          </button>
          <button
            onClick={() => setTab("preview")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "preview"
                ? "bg-zinc-700 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Preview
          </button>
        </div>

        {tab === "edit" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            spellCheck={false}
            placeholder="Paste or write your HTML content here..."
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-coral-500 resize-y"
          />
        ) : (
          <div
            className="rounded-lg bg-white border border-zinc-700 px-8 py-6 min-h-[300px] prose prose-zinc max-w-none text-zinc-900"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
}

// ---------- Main Admin Page ----------

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null | "new">(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
      setAuthed(true);
    } catch {
      setAuthed(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onLogin={loadPosts} />;
  }

  if (editing !== null) {
    return (
      <div className="min-h-screen bg-zinc-950 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <PostEditor
            post={editing === "new" ? null : editing}
            onSave={() => {
              setEditing(null);
              loadPosts();
            }}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>
    );
  }

  const handleDelete = async (slug: string) => {
    setDeleting(slug);
    try {
      await deletePostApi(slug);
      loadPosts();
    } catch {
      // silently fail
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-zinc-100">Blog Posts</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing("new")}
              className="rounded-lg bg-coral-600 hover:bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              + New Post
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg mb-2">No posts yet</p>
            <p className="text-sm">
              Click &ldquo;+ New Post&rdquo; to create your first blog post.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-zinc-100 truncate">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                    <span>/blog/{post.slug}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditing(post)}
                    className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    disabled={deleting === post.slug}
                    className="rounded-lg border border-red-900 px-3 py-1.5 text-xs text-red-400 hover:bg-red-950 disabled:opacity-50 transition-colors"
                  >
                    {deleting === post.slug ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
