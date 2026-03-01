// Login page uses its own minimal layout, not the admin sidebar layout
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
