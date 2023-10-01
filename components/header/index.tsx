"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ReactDOM } from "react";
import { Album, Result, Face, Setting } from "../../assets/images/header/index";
import { motion } from "framer-motion";

const variants: any = {
  animetion: ({ y }: { y: number }) => {
    return {
      y: y,
      transition: {
        type: "spring",
        bounce: 0.1,
      },
    };
  },
};
function Index() {
  const location = useLocation()
  const album = useRef(null);
  const result = useRef(null);
  const face = useRef(null);
  const setting = useRef(null);
  const [action, setAction] = useState<any>((): any => {
    const { offsetTop }: any = album?.current || 0;
    return { y: offsetTop, action: 1 };
  });
  useEffect(()=>{
    switch(location.pathname) {
      case "/album" : 
        setAction((): any => {
        const { offsetTop }: any = album?.current;
        return { y: offsetTop, action: 1 };
        });
        break;
      case "/result" : 
        setAction((): any => {
        const { offsetTop }: any = result?.current;
        return { y: offsetTop, action: 2 };
        });
        break;
      case "/face" : 
        setAction((): any => {
        const { offsetTop }: any = face?.current;
        return { y: offsetTop, action: 3 };
        });
        break;
      case "/setting" : 
        setAction((): any => {
        const { offsetTop }: any = setting?.current;
        return { y: offsetTop, action: 4 };
        });
        break;
    }
  }, [location.pathname])
  return (
    <>
      <nav className="xl:w-[180px]  py-[60px] h-full bg-[#202020] overflow-hidden">
        <ul className="relative flex flex-col justify-between text-[#fff] h-full max-h-[750px]">
          <motion.div
            animate={"animetion"}
            custom={action}
            variants={variants}
            className={`absolute w-full rounded-[40px_0px_0_40px] bg-[#fff] xl:h-[75px] z-[1]`}
          >
            <div className="absolute right-0 xl:w-[30px] xl:h-[30px] bg-[#202020] rounded-full bottom-[100%] shadow-[16px_16px_0_0px_#fff]"></div>
            <div className="absolute right-0 xl:w-[30px] xl:h-[30px] bg-[#202020] rounded-full top-[100%]  shadow-[16px_-16px_0_0px_#fff]"></div>
          </motion.div>
          <li
            ref={album}
            className="xl:pl-[20px] xl:h-[75px] flex items-center z-[2]"
          >
            <Link
              to="/album"
              className="flex xl:gap-[10px] items-center"
            >
              <Album color={action?.action != 1 ? "#fff" : "#202020"}></Album>
              <motion.p
                className={` text-[20px] font-[700] ${
                  action?.action != 1 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Album
              </motion.p>
            </Link>
          </li>
          <li
            ref={result}
            className=" xl:pl-[20px] xl:h-[75px] flex items-center z-[2]"
          >
            <Link
              to="/result"
              className="flex xl:gap-[10px] items-center "
            >
              <Result color={action?.action != 2 ? "#fff" : "#202020"}></Result>
              <motion.p
                className={` text-[20px] font-[700] ${
                  action?.action != 2 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Result
              </motion.p>
            </Link>
          </li>
          <li
            ref={face}
            className=" xl:pl-[20px] xl:h-[75px] flex items-center z-[2]"
          >
            <Link
              to="/face"
              className="flex xl:gap-[10px] items-center"
            >
              <Face color={action?.action != 3 ? "#fff" : "#202020"}></Face>
              <motion.p
                className={` text-[20px] font-[700] ${
                  action?.action != 3 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Face
              </motion.p>
            </Link>
          </li>
          <li
            ref={setting}
            className=" xl:pl-[20px] xl:h-[75px] flex items-center z-[2]"
          >
            <Link
              to="/setting"
              className="flex xl:gap-[10px] items-center"
            >
              <Setting
                color={action?.action != 4 ? "#fff" : "#202020"}
              ></Setting>
              <motion.p
                className={` text-[20px] font-[700] ${
                  action?.action != 4 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Setting
              </motion.p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Index;
