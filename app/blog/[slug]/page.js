import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8 inline-block">
        &larr; Back to all posts
      </Link>

      <header className="mb-8">
        <p className="text-sm text-gray-400 mb-2">{formatDate(post.date)}</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">{post.title}</h1>
        <p className="text-gray-500">By {post.author}</p>
      </header>

      <div className="prose prose-gray max-w-none">
        {renderContent(post.content)}
      </div>
    </article>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Lightweight markdown-like renderer — no external deps needed for this simple blog
function renderContent(content) {
  const lines = content.trim().split("\n");
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm my-6">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      i++; // skip closing ```
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold mt-8 mb-3 text-gray-900">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold mt-6 mb-2 text-gray-900">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-heading lines
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```")
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="text-gray-700 leading-relaxed mb-4">
          {renderInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return elements;
}

// Render inline **bold** and `code`
function renderInline(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`)/g;
  let last = 0;
  let match;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[0].startsWith("**")) {
      parts.push(<strong key={k++}>{match[2]}</strong>);
    } else {
      parts.push(
        <code key={k++} className="bg-gray-100 text-gray-800 rounded px-1 py-0.5 text-sm font-mono">
          {match[3]}
        </code>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
