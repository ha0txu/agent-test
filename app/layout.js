import "./globals.css";

export const metadata = {
  title: {
    default: "DevBlog",
    template: "%s | DevBlog",
  },
  description: "A simple blog about web development with Next.js, React, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight hover:text-blue-600 transition-colors">
              DevBlog
            </a>
            <nav className="flex gap-6 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
              <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>

        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DevBlog. Built with Next.js.
          </div>
        </footer>
      </body>
    </html>
  );
}
