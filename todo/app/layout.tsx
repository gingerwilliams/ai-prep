import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const links = [
  {href: "/", label: "Home"},
  {href: "/docs", label: "Docs"},
  {href: "/todos", label: "Todos"},
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
          <nav>
            <ul className="flex items-center">
              { 
                links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href}> {link.label} </Link>
                  </li>
                ))

              }
            </ul>
          </nav>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}
