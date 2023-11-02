"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/header";
import Tool from "../components/tool";
import { useEffect, useRef, useState } from "react";
import Album from "./album/page";
import Head from "next/head";
export default function RootLayout(props: any) {
  const currentPage = usePathname();
  const [isLoginPage, setLoginPage] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isUpload, setUpload] = useState<boolean>(false);
  const arrCheckLogin = ["/login/signin", "/login/signup", "/"];
  const [isLoading, setLoading] = useState<boolean>(true);
  const [action, setAction] = useState<any>((): any => {
    return { y: 0, action: 1 };
  });
  useEffect(() => {
    if (!arrCheckLogin.includes(currentPage) && !currentPage.includes("/map"))
      setLoginPage(true);
  }, [usePathname()]);
  useEffect(() => {
    setLoading(false);
  }, [isUpload]);
  return (
    <html lang="en">
      <head>
        <title>Glimpse</title>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${inter.className} select-none md:px-0 sm:px-[10px]  ${
          !isLoginPage ? "bg-[#f5f5f5]" : "bg-[#202020]"
        }`}
      >
        {isLoginPage ? (
          <>
            <header className="w-full] lg:h-[80px] md:h-[60px] sm:h-[40px]">
              <div className="max-w-[1440px] mx-[auto] h-full"></div>
            </header>
            <main className="relative justify-start max-h-[1440px] flex max-w-[1440px] lg:h-[calc(100vh-80px)] md:h-[calc(100vh-60px)] sm:h-[calc(100vh-40px)] mx-[auto]">
              <Header
                url={currentPage}
                action={action}
                setAction={setAction}
              ></Header>
              <section className="relative h-[calc(100%-10px)]  w-full">
                <div className="overflow-y-scroll h-full flex flex-col bg-[#fff] lg:rounded-[20px_0_0_20px] sm:rounded-[10px_0_0_10px] xl:pt-[40px] xl:pb-[120px] xl:pl-[40px] md:p-[20px] md:pb-[120px] sm:p-[10px] sm:pb-[100px]  md:gap-[40px] sm:gap-[20px]">
                  {currentPage === "/album" ? (
                    <Album
                      setOpen={setOpen}
                      open={open}
                      isLoading={isLoading}
                      setLoading={setLoading}
                      isUpload={isUpload}
                    ></Album>
                  ) : (
                    props.children
                  )}
                </div>
              </section>
              <Tool
                setOpen={setOpen}
                setUpload={setUpload}
                isUpload={isUpload}
              ></Tool>
            </main>
          </>
        ) : (
          <main className="md:w-[100vw] w-[calc(100vw-20px)] md:h-[100vh] h-[calc(100vh-20px)]">
            {props.children}
          </main>
        )}
      </body>
    </html>
  );
}
