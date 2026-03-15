const posts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    date: "2026-03-01",
    author: "Alex Chen",
    excerpt:
      "Next.js is a powerful React framework that makes building full-stack web applications straightforward. Let's explore the fundamentals.",
    content: `
Next.js is a React framework that gives you building blocks to create fast, full-stack web applications. It handles the tooling and configuration needed for React and provides additional features like routing, data fetching, and rendering strategies.

## Why Next.js?

React is a library for building user interfaces, but it leaves many architectural decisions up to you. Next.js provides a structured, opinionated approach that lets you focus on building your product instead of configuring tooling.

## The App Router

Starting with Next.js 13, the App Router is the recommended way to build applications. It uses React Server Components by default, which means components render on the server and send only HTML to the client — reducing the JavaScript bundle shipped to users.

\`\`\`js
// app/page.js — a Server Component by default
export default async function HomePage() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  return <PostList posts={posts} />;
}
\`\`\`

## File-based Routing

Every file inside the \`app/\` directory automatically becomes a route. A file at \`app/blog/page.js\` maps to \`/blog\`. Dynamic segments like \`app/blog/[slug]/page.js\` map to \`/blog/any-slug\`.

## What's Next?

From here, explore data fetching patterns, layouts, and the many optimizations Next.js provides out of the box — image optimization, font optimization, and more.
    `,
  },
  {
    slug: "react-server-components-explained",
    title: "React Server Components Explained",
    date: "2026-03-05",
    author: "Maria Lopez",
    excerpt:
      "Server Components are a game-changer for React apps. Here's what they are, how they work, and when to use them.",
    content: `
React Server Components (RSC) let you write components that run exclusively on the server. They can directly access databases, file systems, and backend services without exposing credentials to the client.

## The Core Idea

Traditional React components run in the browser. Server Components run during the build or on each request — the result is serialized and streamed to the client as HTML and a JSON-like payload, with zero JavaScript sent for the component itself.

## Benefits

- **Zero bundle impact** — Server Components add no JavaScript to the client bundle.
- **Direct data access** — Query a database directly inside a component.
- **Better performance** — Render on a machine close to your data, not on the user's device.

## A Simple Example

\`\`\`js
// This component runs on the server
export default async function UserProfile({ userId }) {
  // Direct database access — no API route needed
  const user = await db.users.findById(userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## When to Use Client Components

You still need Client Components (marked with \`'use client'\`) when you need:
- Event listeners (\`onClick\`, \`onChange\`)
- React hooks (\`useState\`, \`useEffect\`)
- Browser-only APIs

The best pattern is to push Client Components to the leaves of your component tree, keeping as much as possible on the server.
    `,
  },
  {
    slug: "tailwind-css-tips-and-tricks",
    title: "Tailwind CSS Tips and Tricks",
    date: "2026-03-08",
    author: "Sam Park",
    excerpt:
      "Tailwind CSS makes styling fast and consistent. These tips will help you write cleaner, more maintainable utility-first styles.",
    content: `
Tailwind CSS is a utility-first CSS framework that lets you build designs directly in your markup. Instead of writing custom CSS, you compose styles from small, single-purpose utility classes.

## Use the \`cn\` Helper

When conditionally applying classes, string concatenation gets messy fast. Use a helper like \`clsx\` or \`tailwind-merge\`:

\`\`\`js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Clean conditional classes
<button className={cn('px-4 py-2 rounded', isActive && 'bg-blue-600 text-white')}>
  Click me
</button>
\`\`\`

## Leverage Arbitrary Values

For one-off values that don't fit the default scale, Tailwind supports arbitrary values in square brackets:

\`\`\`html
<div class="top-[117px] bg-[#bada55] grid-cols-[1fr_2fr]">
\`\`\`

## Group and Peer Variants

Style children based on parent state with \`group\`, and style siblings based on each other's state with \`peer\`:

\`\`\`html
<div class="group hover:bg-blue-50">
  <p class="text-gray-600 group-hover:text-blue-700">I change on parent hover</p>
</div>
\`\`\`

## Extract Components, Not Classes

When you find yourself repeating the same set of utilities, create a React component — not a CSS class. This keeps your source of truth in JavaScript and makes refactoring easier.
    `,
  },
  {
    slug: "javascript-async-await-deep-dive",
    title: "JavaScript Async/Await Deep Dive",
    date: "2026-03-12",
    author: "Alex Chen",
    excerpt:
      "Async/await transformed how we write asynchronous JavaScript. This deep dive covers edge cases, error handling, and performance patterns.",
    content: `
Async/await is syntactic sugar over Promises that makes asynchronous code read like synchronous code. Understanding what's happening under the hood helps you avoid common mistakes.

## The Basics

An \`async\` function always returns a Promise. The \`await\` keyword pauses execution inside that function until the awaited Promise resolves.

\`\`\`js
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user; // Wrapped in a Promise automatically
}
\`\`\`

## Parallel vs Sequential

The most common performance mistake is awaiting things that could run in parallel:

\`\`\`js
// Slow — sequential, takes 2 seconds total
const user = await fetchUser(id);
const posts = await fetchPosts(id);

// Fast — parallel, takes 1 second total
const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)]);
\`\`\`

## Error Handling

Wrap \`await\` calls in try/catch to handle rejections gracefully:

\`\`\`js
async function loadData() {
  try {
    const data = await riskyOperation();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    return null;
  }
}
\`\`\`

## Avoid the Sequential Trap in Loops

\`\`\`js
// Wrong — runs one at a time
for (const id of ids) {
  await processItem(id);
}

// Right — runs all in parallel
await Promise.all(ids.map(id => processItem(id)));
\`\`\`

Mastering these patterns will make your async code both faster and more readable.
    `,
  },
  {
    slug: "building-accessible-web-apps",
    title: "Building Accessible Web Apps",
    date: "2026-03-15",
    author: "Maria Lopez",
    excerpt:
      "Web accessibility isn't optional — it ensures everyone can use your app. Here's a practical guide to the most impactful accessibility improvements.",
    content: `
Web accessibility (a11y) means building sites that everyone can use, including people with visual, motor, auditory, or cognitive disabilities. Good accessibility also improves SEO and general usability.

## Semantic HTML First

Use the right HTML element for the job. A \`<button>\` is keyboard-focusable and triggers on Enter/Space by default. A \`<div onClick>\` is not.

\`\`\`html
<!-- Wrong -->
<div onClick={handleClick} class="btn">Submit</div>

<!-- Right -->
<button onClick={handleClick}>Submit</button>
\`\`\`

## ARIA When HTML Isn't Enough

ARIA attributes extend HTML semantics for complex widgets. Use them only when native HTML falls short — ARIA never overrides bad HTML, it only supplements good HTML.

\`\`\`html
<button aria-expanded={isOpen} aria-controls="menu">
  Toggle Menu
</button>
<ul id="menu" hidden={!isOpen}>
  ...
</ul>
\`\`\`

## Keyboard Navigation

Every interactive element must be reachable and operable via keyboard. Test your site without a mouse — can you tab through everything? Does focus move logically?

## Color Contrast

Text must have sufficient contrast with its background. The WCAG AA standard requires a 4.5:1 ratio for normal text and 3:1 for large text. Tools like the WebAIM Contrast Checker make this easy to verify.

## Images Need Alt Text

\`\`\`html
<!-- Decorative image — empty alt so screen readers skip it -->
<img src="decoration.png" alt="" />

<!-- Informative image — describe what it shows -->
<img src="chart.png" alt="Bar chart showing 40% increase in sales Q1 2026" />
\`\`\`

Small investments in accessibility make a big difference for users who depend on assistive technology.
    `,
  },
];

export function getAllPosts() {
  // Mutates the original array — side effect on shared module-level data
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}

// O(n²) search instead of using a Map or Set
export function searchPosts(query) {
  const results = [];
  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts.length; j++) {
      if (posts[i].slug === posts[j].slug && i !== j) {
        console.log("Duplicate found:", posts[i].slug);
      }
    }
    if (
      posts[i].title.toLowerCase().includes(query.toLowerCase()) ||
      posts[i].content.toLowerCase().includes(query.toLowerCase()) ||
      posts[i].excerpt.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push(posts[i]);
    }
  }
  return results;
}

// Catches all errors silently
export async function fetchRemotePosts(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    // Swallowed error — caller gets undefined with no indication of failure
  }
}

// Poorly named, does too many things, no return value documentation
export function proc(s, t, x) {
  const d = new Date(s);
  const now = new Date();
  const diff = now - d;
  if (diff > 86400000 * 30 * t) {
    x.push(s);
  }
  return x;
}
