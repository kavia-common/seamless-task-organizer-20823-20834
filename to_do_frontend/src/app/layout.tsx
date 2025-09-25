import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seamless Task Organizer",
  description:
    "A modern to-do application with Ocean Professional theme: manage, organize, and complete tasks efficiently.",
  applicationName: "Seamless Task Organizer",
  authors: [{ name: "Seamless" }],
  keywords: ["to-do", "tasks", "Next.js", "Ocean Professional"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased text-[color:var(--color-text)] bg-[color:var(--color-background)]" suppressHydrationWarning>
        <div className="header-gradient border-b border-gray-100">
          <nav className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white grid place-items-center shadow-sm">
                <span className="text-lg font-semibold">✓</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900">
                  Seamless Task Organizer
                </h1>
                <p className="text-xs text-gray-500">Ocean Professional</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="badge">Next.js</span>
              <span className="badge">Modern UI</span>
            </div>
          </nav>
        </div>
        <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
          {children}
        </main>
        <footer className="mt-10 border-t border-gray-100">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Seamless</span>
            <span className="hidden sm:inline">Blue & amber accents • Subtle shadows • Rounded corners</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
