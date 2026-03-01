// Root layout — delegates to [locale]/layout.tsx
// This file is needed for Next.js but all rendering happens in the locale layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
