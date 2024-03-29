import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ContextProvider from "@/components/context";
const inter = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' '}>
        <ContextProvider>
          <div className=" max-w-6xl w-full mx-auto px-2">
            <Header />
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
