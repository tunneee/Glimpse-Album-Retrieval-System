"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/header";
import Tool from "../components/tool";
import AlbumPage from "../components/home/album"
import ResultPage from "../components/home/result"
import FacePage from "../components/home/face"
import SettingPage from "../components/home/setting"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#202020]`}>
        <BrowserRouter>
          <header className=" w-full] xl:h-[80px]">
            <div className="max-w-[1440px] mx-[auto] h-full"></div>
          </header>
          <main className="justify-start flex max-w-[1440px] xl:h-[calc(100vh-80px)] mx-[auto]">
            <Header></Header>
            <Routes>
              <Route path="/album" element={<AlbumPage />}></Route>
              <Route path="/" element={<AlbumPage />}></Route>
              <Route path="/result" element={<ResultPage />}></Route>
              <Route path="/face" element={<FacePage />}></Route>
              <Route path="/setting" element={<SettingPage />}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </body>
    </html>
  );
}
