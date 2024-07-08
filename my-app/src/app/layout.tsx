import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Foot } from "./component/Footer";

const style: React.CSSProperties = { background: "#FFFFFF", padding: "30px" };
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className={outfit.className}>
        <div className="mx-auto p-7 ">{children}</div>
      </body>
    </html>
  )
}