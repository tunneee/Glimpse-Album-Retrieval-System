"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import imageIcon from "@/assets/images/home/image.svg";
import videoIcon from "@/assets/images/home/video.svg";
import { useState } from "react";
import Link from "next/link";
import defaulImage from "@/assets/images/home/default-image.png";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import style from "./style.module.css";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
type Props = {
  url?: string | undefined | null;
  filetype?: string | undefined | null;
  id?: string | undefined | null;
  video_url?: string | null | undefined;
  video_id?: string | null | undefined;
  times?: number | undefined;
  answer?: string | undefined;
  timestamp?: number | undefined;
  isLoading: boolean;
};
const setClick = {
  hidden: {
    x: 0,
    y: 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  exit: {
    zIndex: 5,
  },
};
const Card = (props: Props) => {
  const videoCurrent = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLLIElement>(null);
  const [isThumnail, setThumnail] = useState<boolean>(true);
  const [isContinue, setContinue] = useState<boolean>(false);
  const [isSelect, setSelect] = useState<boolean>(false);
  const [isHover, setHover] = useState<boolean>(false);

  let stillPreview: any = null;
  const time = new Date(props?.timestamp ? props?.timestamp * 1000 : -1);
  const date = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const moth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    if (!isContinue)
      return () => {
        clearInterval(stillPreview);
        stillPreview = [];
      };
    if (isContinue)
      stillPreview = setInterval(
        (function first() {
          startPreview();
          return first;
        })(),
        10000
      );
    return () => clearInterval(stillPreview);
  }, [isContinue]);
  function secondsToHms(d: any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h >= 10 ? `${h}0` : h > 0 ? `0${h}` : "00";
    var mDisplay = m >= 10 ? `${m}` : m > 0 ? `0${m}` : "00";
    var sDisplay = s >= 10 ? `${s}` : s > 0 ? `0${s}` : "00";
    return [hDisplay, mDisplay, sDisplay].join(":");
  }
  const startPreview = () => {
    const video: HTMLMediaElement | null = videoCurrent.current;
    if (video && props?.times)
      video!.currentTime = props?.times > 5 ? props?.times - 5 : 5;
    video?.play();
  };
  const stopPreview = () => {
    const video: HTMLMediaElement | null = videoCurrent.current;
    video!.currentTime = 1;
    if (video && props?.times)
      video!.currentTime = props?.times > 5 ? props?.times - 5 : 5;
    video?.pause();
  };
  const [isplay, setplay] = useState<boolean>(false);
  if (props.isLoading)
    return (
      <>
        <motion.li
          animate="show"
          initial="hidden"
          variants={setClick}
          exit="exit"
          layoutId={`${props?.answer || ""}${props?.id}`}
          onClick={() => {
            setSelect(true);
          }}
          className="cursor-pointer hover:shadow-[0_0_10px_0px_#202020] transition-shadow duration-200 ease-in-out lg:rounded-[20px] sm:rounded-[10px] relative aspect-[1/1] xl:w-[170px] lg:w-[calc((100%-40px)/5)] md:w-[calc((100%-30px)/4)] ssm:w-[calc((100%-24px)/4)] sm:w-[calc((100%-16px)/3)] shadow-[4px_4px_4px_0_rgba(32,32,32,0.25)] overflow-hidden"
        >
          {props?.filetype == "image" ? (
            <picture>
              <LazyLoadImage
                effect="blur"
                placeholderSrc={`${props?.url}?tr=w-130` || "/"}
                src={`${props?.url}` || "/"}
                alt="anh"
                width={"100%"}
                height={"100%"}
                className="object-cover  w-[100%] h-[100%]"
              ></LazyLoadImage>
            </picture>
          ) : (
            <div
              onMouseEnter={() => {
                setThumnail(false);
                setContinue(true);
              }}
              onMouseLeave={() => {
                setThumnail(true);
                setContinue(false);
                clearInterval(stillPreview);
                stillPreview = [];
                stopPreview();
              }}
              className="w-full h-full relative"
            >
              <span
                className={` ${
                  isThumnail ? "opacity-100" : "opacity-0"
                } absolute transition-opacity duration-[1s]  w-full h-full`}
              >
                <LazyLoadImage
                  effect="blur"
                  placeholderSrc={`${props?.url}` || "/"}
                  src={`${props?.url}` || "/"}
                  alt="anh"
                  width={"100%"}
                  height={"100%"}
                  className=" w-full h-full"
                ></LazyLoadImage>
              </span>
              <video
                ref={videoCurrent}
                width={170}
                height={170}
                muted
                loop
                className="object-cover block  z-0 w-[100%] h-[100%]"
                id={`video${props?.video_id}`}
              >
                <source src={props?.video_url || ""} type="video/mp4" />
              </video>
            </div>
          )}
          <span className="absolute xl:bottom-[10px] xl:right-[10px] lg:bottom-[8px] lg:right-[8px] sm:bottom-[5px] sm:right-[5px] xl:w-[25px] xl:h-[25px] lg:w-[20px] lg:h-[20px] sm:w-[15px] sm:h-[15px] overflow-hidden">
            {props?.filetype == "image" ? (
              <Image
                src={imageIcon}
                alt="image"
                width={25}
                height={25}
                className="w-full h-full"
              ></Image>
            ) : (
              <Image
                src={videoIcon}
                alt="image"
                width={25}
                height={25}
                className="w-full h-full"
              ></Image>
            )}
          </span>
        </motion.li>
        <AnimatePresence>
          {isSelect && (
            <div
              // onClick={({ target }: React.MouseEvent) => {
              //   if (!card?.current?.contains(target as Node)) setSelect(false);
              // }}
              className="bg-[#2020207a] lg:p-[20px]  w-full h-full flex justify-start top-0 left-0 absolute z-10"
            >
              <motion.li
                initial="hidden"
                animate={"show"}
                exit="exit"
                variants={setClick}
                ref={card}
                layoutId={`${props?.answer || ""}${props?.id}`}
                className="cursor-pointer flex lg:flex-row  sm:flex-col justify-start transition-shadow duration-200 ease-in-out lg:rounded-[10px] sm:rounded-[10px] relative aspect-[1/1] w-full overflow-hidden"
              >
                <div className="relative bg-[#fff] lg:w-3/5 sm:w-full lg:h-full sm:h-3/5">
                  {props?.filetype == "image" ? (
                    <>
                      <picture className="z-10">
                        <LazyLoadImage
                          src={`${props?.url?.replaceAll("150", "1000")}`}
                          alt="anh"
                          width={1440}
                          height={900}
                          className="object-cover  w-[100%] h-[100%]"
                        ></LazyLoadImage>
                      </picture>
                    </>
                  ) : (
                    <div className="w-full h-full">
                      <video
                        width={1400}
                        height={990}
                        loop
                        controls={isHover}
                        onMouseEnter={() => {
                          setHover(true);
                        }}
                        onMouseLeave={() => {
                          setHover(false);
                        }}
                        autoPlay
                        className="object-cover block  aspect-[1/1] z-0 w-[100%] h-[100%]"
                      >
                        <source src={props?.video_url || ""} type="video/mp4" />
                      </video>
                    </div>
                  )}
                  <span className="absolute xl:bottom-[10px] xl:right-[10px] lg:bottom-[8px] lg:right-[8px] sm:bottom-[5px] sm:right-[5px] xl:w-[25px] xl:h-[25px] lg:w-[20px] lg:h-[20px] sm:w-[15px] sm:h-[15px] overflow-hidden"></span>
                </div>
                <motion.div
                  initial="hidden"
                  animate={"show"}
                  exit="exit"
                  variants={setClick}
                  className="lg:w-2/5 flex sm:flex-row md:flex-col overflow-hidden justify-start sm:w-full lg:h-full sm:h-2/5 bg-[#fff] relative lg:rounded-[0_10px_10px_0]"
                >
                  <button
                    onClick={() => {
                      setSelect(!isSelect);
                    }}
                    className="absolute z-10 top-[5px] right-[5px]"
                  >
                    <CloseIcon className="hover:text-[#0098FF]"></CloseIcon>
                  </button>
                  <div className=" lg:w-full flex flex-col gap-[20px] lg:py-[40px] lg:px-[20px] sm:py-[10px] sm:px-[20px]">
                    <span className="flex sm:flex-col md:flex-row  items-baseline">
                      <h4 className="font-[500] text-[1.2em]">Filetype : </h4>
                      <p className="font-[300] text-[1em]">{` ${
                        props?.filetype == "image"
                          ? `image(${props?.url
                              ?.split(".")
                              .slice(-1)
                              .slice(0, 4)})`
                          : `video(${props?.video_url?.split(".").slice(-1)})`
                      } `}</p>
                    </span>
                    <span className="flex sm:flex-col md:flex-row  items-baseline">
                      <h4 className="font-[500] text-[1.2em] ">Date : </h4>
                      <p className="font-[300] text-[1em]">{` ${
                        date[time.getDay()]
                      } ${time.getDate()}
                      ${moth[time.getMonth()]} ${time.getFullYear()}`}</p>
                    </span>
                    {props?.filetype != "image" ? (
                      <span className="flex sm:flex-col md:flex-row  items-baseline">
                        <h4 className="font-[500] text-[1.2em] ">
                          Video duration :{" "}
                        </h4>
                        <p className="font-[300] text-[1em]">
                          {`${secondsToHms(videoCurrent?.current?.duration)}`}
                        </p>
                      </span>
                    ) : null}
                  </div>
                  <div className="w-full h-full relative">
                    <iframe
                      className="w-full h-full relative"
                      src={`https://glimpse.serveo.net/map/${props.id}`}
                    ></iframe>
                    <Link
                      href={`/map/${props.id}`}
                      target="_blank"
                      className="absolute bottom-[10px] right-[10px] p-[10px_20px] bg-[#202020] text-[#fff] rounded-full"
                    >
                      Go to map
                    </Link>
                  </div>
                </motion.div>
              </motion.li>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  else
    return (
      <li className="lg:rounded-[20px] sm:rounded-[10px] flex justify-center flex-wrap items-center relative aspect-[1/1] xl:w-[170px] lg:w-[calc((100%-40px)/5)] md:w-[calc((100%-30px)/4)] ssm:w-[calc((100%-24px)/4)] sm:w-[calc((100%-16px)/3)] overflow-hidden">
        <Skeleton
          width={250}
          height={250}
          variant="rounded"
          className="w-full h-full"
        />
        <p
          className={`${style.text} lg:text-[22px] md:text-[20px] sm:text-[16px]`}
        >
          Glimpse
        </p>
      </li>
    );
};

export default Card;
