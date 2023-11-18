"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/header";
import Tool from "../components/tool";
import { useEffect, useRef, useState, useContext } from "react";
import Album from "./album/page";
import { withRouter } from "next/router";
import { log } from "console";
import { Provide } from "@/components/contextProvide";
import { motion } from "framer-motion";
import Section from "@/components/viewImage";

export default function RootLayout({ children, router }: any) {
  const currentPage = usePathname();
  // const router = useRouter();
  const [isLoginPage, setLoginPage] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isUpload, setUpload] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [url, setUrl] = useState<string>(currentPage);
  const arrCheckLogin = ["/login/signin", "/login/signup", "/"];
  const [isLoading, setLoading] = useState<boolean>(true);

  const [action, setAction] = useState<any>((): any => {
    return { y: 0, action: 1 };
  });
  useEffect(() => {
    setLoading(false);
    window.addEventListener("resize", (event) => {
      const target = event.target as Window;
      setScreen(target.innerWidth);
    });
    setLoading(false);
    window.addEventListener("navigate", (event) => {
      console.log("e", event);
    });
  }, [isUpload]);
  useEffect(() => {
    if (!arrCheckLogin.includes(currentPage) && !currentPage.includes("/map"))
      setLoginPage(true);
    else setLoginPage(false);
  }, [router]);

  return (
    <Provide>
      <html lang="en">
        <head>
          <title>Glimpse</title>
          <link rel="icon" href="/favicon.svg" />
        </head>
        <body
          className={`${
            inter.className
          } select-none md:px-0 flex items-center w-[100vw]  h-[100vh]  sm:px-[10px]  ${
            !isLoginPage ? "bg-[#f5f5f5]" : "bg-[#202020]"
          }`}
        >
          {isLoginPage ? (
            <>
              <header className="w-full] lg:h-[80px] md:h-[60px] sm:h-[40px]">
                <div className="max-w-[1440px] mx-[auto] h-full"></div>
              </header>
              <main className="relative justify-start max-h-[1440px] w-full flex max-w-[1440px]  lg:h-[calc(100vh-80px)] md:h-[calc(100vh-60px)] sm:h-[calc(100vh-40px)] mx-[auto]">
                <Header
                  screen={screen}
                  url={currentPage}
                  action={action}
                  setAction={setAction}
                ></Header>
                <Section>{children}</Section>
                <Tool
                  screen={screen}
                  setOpen={setOpen}
                  setUpload={setUpload}
                  isUpload={isUpload}
                ></Tool>
              </main>
            </>
          ) : (
            <main className="md:w-[100vw] flex justify-center  w-[calc(100%-20px)] max-w-[1440px] max-h-[900px] mx-[auto] md:h-[100vh] h-[calc(100%-20px)]">
              {children}
            </main>
          )}
        </body>
      </html>
    </Provide>
  );
}
