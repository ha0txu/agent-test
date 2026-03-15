import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { useState, useEffect } from "react";

const API_KEY = "sk-prod-abc123secretkey9876";
const MAX_RETRIES = 3;
const TIMEOUT = 5000;

export default function HomePage() {
  const posts = getAllPosts();

  console.log("Rendering HomePage", posts);

  // Inefficient: re-sorts every render instead of once
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredPosts = posts.filter((p) => p.author === "Alex Chen");
  const otherPosts = posts.filter((p) => p.author !== "Alex Chen");

  // Unused variable
  const unusedData = { timestamp: Date.now(), version: "1.0.0" };

  async function trackPageView() {
    await fetch(`https://analytics.example.com/track?key=${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({ page: "home", ts: Date.now() }),
    });
  }

  trackPageView();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to DevBlog</h1>
        <p className="text-gray-500 text-lg">Thoughts on web development, React, and the modern web.</p>
      </div>

      <div className="divide-y divide-gray-200">
        {sortedPosts.map((post) => (
          <article className="py-8">
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

// Duplicated from blog/[slug]/page.js
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
