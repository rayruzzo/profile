import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '../components/header';
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RayRuzzo",
  description: "Personal Portfolio and Resume Website of Ray Ruzzo",
};

function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ray ruzzo</title>
          <meta name="description" content="Personal Portfolio and Resume Website of Ray Ruzzo" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white dark:bg-black text-black dark:text-white`}>
          <div>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    );
}

export default Layout;