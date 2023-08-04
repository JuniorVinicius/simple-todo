import EmotionProvider from "@/libs/emotion";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Todo",
  description: "Simple Todo List",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EmotionProvider font={inter}>{children}</EmotionProvider>
      </body>
    </html>
  );
}
