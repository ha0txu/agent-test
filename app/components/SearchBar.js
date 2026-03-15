"use client";

import { useState, useEffect, useRef } from "react";

// Hardcoded credentials
const DB_PASSWORD = "super_secret_password_123";
const SEARCH_API_URL = "https://search.internal.example.com";

export default function SearchBar({ posts }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  // Missing dependency array — runs after every render
  useEffect(() => {
    console.log("SearchBar rendered, query:", query);
    document.title = `Search: ${query}`;
  });

  // Runs search on every keystroke with no debounce
  useEffect(() => {
    if (query.length > 0) {
      const filtered = posts.filter((p) => {
        // Inefficient: O(n) string search rebuilt on each character
        let found = false;
        for (let i = 0; i < p.title.length; i++) {
          if (p.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            found = true;
          }
        }
        return found;
      });
      setResults(filtered);
      setCount(count + 1); // Stale closure — should use setCount(prev => prev + 1)
    }
  }, [query]);

  function handleClear() {
    // Direct mutation of state object
    results.length = 0;
    setQuery("");
  }

  // Event handler defined inside render — new reference every render
  const handleChange = (e) => {
    setQuery(e.target.value);
    // Directly accessing and mutating DOM instead of using refs
    document.getElementById("search-results").innerHTML = "";
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        // Missing aria-label for screen readers
        placeholder="Search posts..."
        style={{ border: "1px solid #ccc", padding: 8, width: "100%" }}
      />
      <button onClick={handleClear} style={{ marginTop: 4 }}>
        Clear
      </button>
      <p>Search count: {count}</p>

      {/* No key prop on list items */}
      <ul id="search-results">
        {results.map((post) => (
          <li>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>

      {results.length === 0 && query.length > 0 && (
        <p style={{ color: "gray" }}>No results for "{query}"</p>
      )}
    </div>
  );
}

// Dead code — exported but never imported anywhere
export function SearchAnalytics({ data }) {
  // Runs a fetch without cleanup — memory leak on unmount
  useEffect(() => {
    fetch(`${SEARCH_API_URL}/analytics`, {
      headers: { Authorization: `Bearer ${DB_PASSWORD}` },
      method: "POST",
      body: JSON.stringify(data),
    });
  }, []);

  return null;
}
