"use client";
import "./globals.css";
import type { Metadata } from "next";
import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/header";
import Tool from "../components/tool";
import {useState } from "react"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPage = usePathname();
  return (
      <html lang="en">
        <body className={`${inter.className} select-none  bg-[#202020]`}>
          <header className=" w-full] lg:h-[80px]">
            <div className="max-w-[1440px] mx-[auto] h-full"></div>
          </header>
          <main className="relative justify-start max-h-[1440px] flex max-w-[1440px] lg:h-[calc(100vh-80px)] mx-[auto]">
            <Header url={currentPage}></Header>
            <section className="overflow-y-scroll w-full h-[calc(100%-10px)]   flex flex-col bg-[#fff] rounded-[20px_0_0_20px] xl:pt-[40px] xl:pb-[120px] xl:pl-[40px] lg:p-[20px] lg:pb-[100px] lg:gap-[40px] sm:gap-[20px]">
              {children}
            </section>
            <Tool></Tool>
          </main>
        </body>
      </html> 
  );
}
