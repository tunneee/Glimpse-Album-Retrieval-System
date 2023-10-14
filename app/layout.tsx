"use client";
import "./globals.css";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/header";
import Tool from "../components/tool";
import { useEffect, useState } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPage = usePathname();
  const [isLoginPage, setLoginPage] = useState<boolean>(false);
  const arrCheckLogin = ["/login/signin", "/login/signup"];
  useEffect(() => {
    if (!arrCheckLogin.includes(currentPage)) setLoginPage(true);
  },[currentPage]);
  return (
    <html lang="en">
      <body
        className={`${inter.className} select-none md:px-0 sm:px-[10px]  ${!isLoginPage ? "bg-[#f5f5f5]" : "bg-[#202020]"}`}
      >
        {isLoginPage ? (
          <>
            <header className="w-full] lg:h-[80px] md:h-[60px] sm:h-[40px]">
              <div className="max-w-[1440px] mx-[auto] h-full"></div>
            </header>
            <main className="relative justify-start max-h-[1440px] flex max-w-[1440px] lg:h-[calc(100vh-80px)] md:h-[calc(100vh-60px)] sm:h-[calc(100vh-40px)] mx-[auto]">
              <Header url={currentPage}></Header>
              <section className="relative h-[calc(100%-10px)]  w-full">
                <div className="overflow-y-scroll h-full flex flex-col bg-[#fff] lg:rounded-[20px_0_0_20px] sm:rounded-[10px_0_0_10px] xl:pt-[40px] xl:pb-[120px] xl:pl-[40px] md:p-[20px] md:pb-[100px] sm:p-[10px] sm:pb-[40px]  md:gap-[40px] sm:gap-[20px]">
                  {children}
                </div>
              </section>
              <Tool></Tool>
            </main>
          </>
        ) : (
          <main  className="w-[100vw] h-[100vh]">{children}</main>
        )}
      </body>
    </html>
  );
}
