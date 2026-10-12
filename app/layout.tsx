import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SpaceBackground from "@/components/SpaceBackground";
import CustomCursor from "@/components/CustomCursor";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Samuel Apoya",
  description: "Personal site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen overflow-x-hidden`}>
        <Providers>
          <SpaceBackground />
          <CustomCursor />
          <main className="relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}