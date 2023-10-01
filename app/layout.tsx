"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/header";
import Tool from "../components/tool";
import AlbumPage from "@/components/home/album";
import ResultPage from "@/components/home/result";
import FacePage from "@/components/home/face";
import SettingPage from "@/components/home/setting";
export default function RootLayout() {
  return (
    <BrowserRouter>
      <html lang="en">
        <body className={`${inter.className} select-none  bg-[#202020]`}>
          <header className=" w-full] xl:h-[80px]">
            <div className="max-w-[1440px] mx-[auto] h-full"></div>
          </header>
          <main className="relative justify-start flex max-w-[1440px] xl:h-[calc(100vh-80px)] mx-[auto]">
            <Header></Header>
            <section className="overflow-y-scroll  h-[calc(100%-10px)] w-full flex flex-col bg-[#fff] rounded-[20px_0_0_20px] xl:pt-[40px] xl:pb-[120px] xl:pl-[40px] lg:gap-[40px] sm:gap-[20px]">
              <Routes>
                <Route path="/album" element={<AlbumPage />}></Route>
                <Route path="/" element={<AlbumPage />}></Route>
                <Route path="/result" element={<ResultPage />}></Route>
                <Route path="/face" element={<FacePage />}></Route>
                <Route path="/setting" element={<SettingPage />}></Route>
              </Routes>
            </section>
          </main>
        </body>
      </html>
    </BrowserRouter>
  );
}
