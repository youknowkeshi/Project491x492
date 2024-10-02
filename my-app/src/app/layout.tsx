import type { Metadata } from "next";
import { Bai_Jamjuree, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Foot } from "./component/Footer";
import { Navbar } from "./component/์Navbar";
const style: React.CSSProperties = { background: "#FFFFFF", padding: "30px" };
const outfit = Outfit({ subsets: ["latin"] });

const BaiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-BaiJamjuree",
});

export const metadata: Metadata = {
  title: "Entaneer Mind Friend",
  description: "Entaneer Mind Friend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={BaiJamjuree.variable}>
        <div className="mx-auto">{children}</div>
      </body>
    </html>
  );
}
