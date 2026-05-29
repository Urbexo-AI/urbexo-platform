export const metadata = {
  title: "Urbexo Platform",
  description: "AI-powered infrastructure for local commerce ecosystem"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
