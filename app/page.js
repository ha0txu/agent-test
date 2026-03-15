import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to DevBlog</h1>
        <p className="text-gray-500 text-lg">Thoughts on web development, React, and the modern web.</p>
      </div>

      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <article key={post.slug} className="py-8">
            <Link href={`/blog/${post.slug}`} className="group">
              <p className="text-sm text-gray-400 mb-1">{formatDate(post.date)}</p>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>By {post.author}</span>
                <span>&middot;</span>
                <span className="text-blue-600 group-hover:underline">Read more &rarr;</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
