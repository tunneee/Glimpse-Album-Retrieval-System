import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Reload, Infor, Position } from "@/assets/images/tool/index";
const variants = {
  is: {
    width:  ["0%", "100%"],
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.2,
    },
  },
  not: {
    width: ["100%", "0%"],
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.2,
    },
  },
};
function Index() {
  const [image, setImage] = useState<File>();
  const uploadFile = (event: any) => {
    if (event.target.files) {
      console.log("event.target.file", event.target.files);
    }
  };
  let waitTime: any = null;
  const [isScroll, setScroll] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("wheel", () => {
      setScroll(true);
      clearTimeout(waitTime);
      waitTime = null;
      waitTime = setTimeout(() => {
        setScroll(false);
      }, 1500);
    });
  }, [isScroll]);
  return (
    <>
      <article
        className={`md:h-full sm:h-[30px] l  sm:hidden md:flex overflow-hidden md:static absolute right-0 bottom-[55px] justify-center   lg:py-[80px] md:py-[60px]`}
      >
        <div className="bg-[#202020]  h-full sm:w-[calc(100%-60px)]  sm:rounded-full flex md:flex-col justify-between items-center xl:w-[80px] lg:w-[50px] md:w-[30px]  md:rounded-hidden sm:px-[20px]  sm:py-0 md:px-0">
          <input
            onChange={(event) => {
              uploadFile(event);
            }}
            className="hidden"
            type="file"
            id="upload"
            accept="image/jpeg/video/mp4"
            multiple
          />
          <label htmlFor="upload">
            <Upload
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
              color="#fff"
            ></Upload>
          </label>
          <input className="hidden" type="button" id="infor" />
          <label htmlFor="infor">
            <Infor
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer  "
              color="#fff"
            ></Infor>
          </label>
          <input className="hidden" type="button" id="position" />
          <label htmlFor="position">
            <Position
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
              color="#fff"
            ></Position>
          </label>
          <input className="hidden" type="button" id="reload" />
          <label htmlFor="reload">
            <Reload
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
              color="#fff"
            ></Reload>
          </label>
        </div>
      </article>
      <article
        className={`md:h-full sm:h-[30px] left-1/2 translate-x-[-50%] sm:w-[calc(100%-60px)]    md:hidden sm:flex overflow-hidden md:static sm:absolute bottom-[55px]  justify-center   lg:py-[80px] md:py-[60px]`}
      >
        <motion.div
          animate={isScroll ? "not" : "is"}
          variants={variants}
          className="bg-[#202020]  h-full sm:rounded-full flex md:flex-col justify-between items-center xl:w-[80px] lg:w-[50px] md:w-[30px]  md:rounded-hidden sm:px-[20px]  sm:py-0 md:px-0"
        >
          <input
            onChange={(event) => {
              uploadFile(event);
            }}
            className="hidden"
            type="file"
            id="upload"
            accept="image/jpeg/video/mp4"
            multiple
          />
          <label
            htmlFor="upload"
            className={`${isScroll ? "hidden" : "block"} `}
          >
            <Upload
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
              color="#fff"
            ></Upload>
          </label>
          <input className="hidden" type="button" id="infor" />
          <label
            htmlFor="infor"
            className={`${isScroll ? "hidden" : "block"} `}
          >
            <Infor
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer  "
              color="#fff"
            ></Infor>
          </label>
          <input className="hidden" type="button" id="position" />
          <label
            htmlFor="position"
            className={`${isScroll ? "hidden" : "block"} `}
          >
            <Position
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
              color="#fff"
            ></Position>
          </label>
          <input className="hidden" type="button" id="reload" />
          <label
            htmlFor="reload"
            className={`${isScroll ? "hidden" : "block"} `}
          >
            <Reload
              className="rounded-full xl:w-[25px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
              color="#fff"
            ></Reload>
          </label>
        </motion.div>
      </article>
    </>
  );
}

export default Index;
