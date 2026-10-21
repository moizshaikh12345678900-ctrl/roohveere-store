import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "RoohVeere | Rooted In Soul, Worn With Pride",
  description:
    "Discover soulful fragrances by RoohVeere, founded by Sirishti Chhabria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}