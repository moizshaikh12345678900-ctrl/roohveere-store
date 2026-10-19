import "./globals.css";

export const metadata = {
  title: "RoohVeere | Rooted In Soul, Worn With Pride",
  description: "Discover soulful fragrances by RoohVeere, founded by Sirishti Chhabria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
