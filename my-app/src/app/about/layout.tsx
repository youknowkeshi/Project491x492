import type { Metadata } from "next";
import { Inter } from "next/font/google";


const style: React.CSSProperties = { background: '#FFFFFF', padding: '30px' };
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function aboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <b></b>
    {children}
    </>
  );
}
