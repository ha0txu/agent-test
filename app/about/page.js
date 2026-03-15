export const metadata = {
  title: "About",
  description: "About DevBlog",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">About DevBlog</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          DevBlog is a place to share practical knowledge about modern web development — from React and Next.js to
          CSS, JavaScript, and accessibility.
        </p>
        <p>
          Our authors are working developers who write about patterns, pitfalls, and techniques they encounter
          every day building production applications.
        </p>
        <p>
          This blog is built with{" "}
          <strong className="text-gray-900">Next.js</strong> and{" "}
          <strong className="text-gray-900">Tailwind CSS</strong> — dogfooding the very tools we write about.
        </p>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold mb-4">Authors</h2>
        <ul className="space-y-3">
          {["Alex Chen", "Maria Lopez", "Sam Park"].map((name) => (
            <li key={name} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                {name[0]}
              </div>
              <span className="text-gray-700">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
