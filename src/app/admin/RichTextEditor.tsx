"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useCallback, useState, useRef, useEffect } from "react";

const lowlight = createLowlight(common);

// ─── Toolbar Button ───
function Btn({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`h-8 min-w-[32px] px-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center
        ${active ? "bg-coral-600 text-white" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700"}
        ${disabled ? "opacity-30 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-zinc-700 mx-0.5" />;
}

// ─── Link Modal ───
function LinkModal({
  initial,
  onSubmit,
  onClose,
}: {
  initial: string;
  onSubmit: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">Insert Link</h3>
        <input
          ref={inputRef}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit(url);
            if (e.key === "Escape") onClose();
          }}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500 mb-3"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(url)}
            className="rounded-lg bg-coral-600 hover:bg-coral-500 px-3 py-1.5 text-xs font-medium text-white transition-colors"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image Modal ───
function ImageModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (url: string, alt: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-bold text-zinc-100 mb-3">Insert Image</h3>
        <div className="space-y-2 mb-3">
          <input
            ref={inputRef}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Image URL (https://...)"
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Alt text (optional)"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit(url, alt);
              if (e.key === "Escape") onClose();
            }}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-coral-500"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(url, alt)}
            disabled={!url}
            className="rounded-lg bg-coral-600 hover:bg-coral-500 disabled:opacity-50 px-3 py-1.5 text-xs font-medium text-white transition-colors"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Editor ───
export function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [sourceHtml, setSourceHtml] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your post..." }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc dark:prose-invert max-w-none min-h-[400px] px-6 py-4 focus:outline-none text-sm leading-relaxed " +
          "prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg " +
          "prose-a:text-coral-500 prose-a:no-underline hover:prose-a:underline " +
          "prose-code:text-coral-400 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded " +
          "prose-blockquote:border-coral-500 prose-img:rounded-lg",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href || "";
    setShowLinkModal(true);
    // store previous in a data attribute hack — we'll use state instead
    setSourceHtml(prev); // reuse sourceHtml temporarily
  }, [editor]);

  const handleLinkSubmit = useCallback(
    (url: string) => {
      if (!editor) return;
      setShowLinkModal(false);
      if (!url) {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    [editor],
  );

  const handleImageSubmit = useCallback(
    (url: string, alt: string) => {
      if (!editor) return;
      setShowImageModal(false);
      if (!url) return;
      editor.chain().focus().setImage({ src: url, alt }).run();
    },
    [editor],
  );

  const toggleSource = useCallback(() => {
    if (!editor) return;
    if (showSource) {
      // Apply source HTML back to editor
      editor.commands.setContent(sourceHtml);
      onChange(sourceHtml);
      setShowSource(false);
    } else {
      setSourceHtml(editor.getHTML());
      setShowSource(true);
    }
  }, [editor, showSource, sourceHtml, onChange]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden">
      {/* ─── Toolbar ─── */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-zinc-800/80 border-b border-zinc-700">
        {/* Text style */}
        <Btn
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          H1
        </Btn>
        <Btn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          H2
        </Btn>
        <Btn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          H3
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph") && !editor.isActive("heading")}
          title="Paragraph"
        >
          P
        </Btn>

        <Divider />

        {/* Formatting */}
        <Btn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Cmd+B)"
        >
          <span className="font-bold">B</span>
        </Btn>
        <Btn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Cmd+I)"
        >
          <span className="italic">I</span>
        </Btn>
        <Btn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Cmd+U)"
        >
          <span className="underline">U</span>
        </Btn>
        <Btn
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </Btn>
        <Btn
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          title="Highlight"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z" />
          </svg>
        </Btn>
        <Btn
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline code"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </Btn>

        <Divider />

        {/* Alignment */}
        <Btn
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="Align left"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
          </svg>
        </Btn>
        <Btn
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="Align center"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" /><line x1="18" y1="18" x2="6" y2="18" />
          </svg>
        </Btn>

        <Divider />

        {/* Lists */}
        <Btn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" /><circle cx="4" cy="6" r="1" fill="currentColor" />
            <circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" />
          </svg>
        </Btn>
        <Btn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" />
            <line x1="10" y1="18" x2="21" y2="18" />
            <text x="2" y="8" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">1</text>
            <text x="2" y="14" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">2</text>
            <text x="2" y="20" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">3</text>
          </svg>
        </Btn>

        <Divider />

        {/* Block elements */}
        <Btn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.7 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.14 0-2.21-.498-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.7 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.14 0-2.21-.498-2.917-1.179z" />
          </svg>
        </Btn>
        <Btn
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code block"
        >
          {"</>"}
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        </Btn>

        <Divider />

        {/* Insert */}
        <Btn
          active={editor.isActive("link")}
          onClick={setLink}
          title="Insert link"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        </Btn>
        <Btn
          onClick={() => setShowImageModal(true)}
          title="Insert image"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </Btn>

        <Divider />

        {/* Undo / Redo */}
        <Btn
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo (Cmd+Z)"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 105.64-11.36L1 10" />
          </svg>
        </Btn>
        <Btn
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo (Cmd+Shift+Z)"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 11-5.64-11.36L23 10" />
          </svg>
        </Btn>

        {/* Spacer + Source toggle */}
        <div className="flex-1" />
        <Btn
          active={showSource}
          onClick={toggleSource}
          title="View/edit HTML source"
        >
          {"{ }"}
        </Btn>
      </div>

      {/* ─── Editor / Source ─── */}
      {showSource ? (
        <textarea
          value={sourceHtml}
          onChange={(e) => setSourceHtml(e.target.value)}
          spellCheck={false}
          className="w-full min-h-[400px] bg-zinc-950 px-4 py-3 text-sm text-zinc-100 font-mono leading-relaxed focus:outline-none resize-y border-none"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      {/* ─── Footer stats ─── */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800/50 border-t border-zinc-700 text-[10px] text-zinc-500">
        <span>
          {editor.storage.characterCount?.words?.() ??
            editor.getText().split(/\s+/).filter(Boolean).length}{" "}
          words
        </span>
        <span>
          {Math.ceil(
            (editor.getText().split(/\s+/).filter(Boolean).length) / 200,
          )}{" "}
          min read
        </span>
      </div>

      {/* ─── Modals ─── */}
      {showLinkModal && (
        <LinkModal
          initial={editor.getAttributes("link").href || ""}
          onSubmit={handleLinkSubmit}
          onClose={() => setShowLinkModal(false)}
        />
      )}
      {showImageModal && (
        <ImageModal
          onSubmit={handleImageSubmit}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
}
