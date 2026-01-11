import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowTrace",
  description: "Frontend-only algorithm execution visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-flow-bg text-flow-text antialiased min-h-screen flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
