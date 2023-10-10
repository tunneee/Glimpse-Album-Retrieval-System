"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import imageIcon from "@/assets/images/home/image.svg";
import videoIcon from "@/assets/images/home/video.svg";
import { useState } from "react";
import Link from "next/link";
import defaulImage from "@/assets/images/home/default-image.png";
import { motion } from "framer-motion";
type Props = {
  url: string;
  filetype: string;
  id: string;
  thumnail: string | null;
};
const Card = (props: Props) => {
  const [isThumnail, setThumnail] = useState<boolean>(true);
  const [isContinue, setContinue] = useState<boolean>(false);
  let previewTimeout: any = null;
  let stillPreview: any = null;
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
  const startPreview = () => {
    const video: HTMLMediaElement | null = document.querySelector(
      `#video${props.id}`
    );
    video!.currentTime = 20;
    video?.play();
  };
  const stopPreview = () => {
    const video: HTMLMediaElement | null = document.querySelector(
      `#video${props.id}`
    );
    video!.currentTime = 20;
    video?.pause();
  };
  const [isplay, setplay] = useState<boolean>(false);
  return (
    <li className="cursor-pointer hover:shadow-[0_0_10px_0px_#202020] transition-shadow duration-200 ease-in-out lg:rounded-[20px] sm:rounded-[10px] relative aspect-[1/1] xl:w-[170px] lg:w-[calc((100%-40px)/5)] md:w-[calc((100%-30px)/4)] ssm:w-[calc((100%-24px)/4)] sm:w-[calc((100%-16px)/3)] shadow-[4px_4px_4px_0_rgba(32,32,32,0.25)] overflow-hidden">
      {props.filetype == "image" ? (
        <picture>
          <Image
            src={props.url}
            alt="anh"
            width={170}
            height={170}
            className="object-cover  w-[100%] h-[100%]"
          ></Image>
        </picture>
      ) : (
        <Link
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
          href={`/album/video/${props.id}`}
          className="group"
        >
          <Image
            src={props!.thumnail || defaulImage}
            alt="day la video"
            width={170}
            height={170}
            className={`w-full block h-full ${
              isThumnail ? "opacity-100" : "opacity-0"
            } absolute transition-opacity duration-[1s] ease-in-out`}
          ></Image>
          <video
            width={170}
            height={170}
            muted
            loop
            className="object-cover block  z-0 w-[100%] h-[100%]"
            id={`video${props.id}`}
            onMouseEnter={(e) => {
              // startPreview();
            }}
            onMouseLeave={(e: React.MouseEvent) => {
              // clearTimeout(previewTimeout);
              // previewTimeout = null;
            }}
          >
            <source src={props.url} type="video/mp4" />
          </video>
        </Link>
      )}
      <span className="absolute xl:bottom-[10px] xl:right-[10px] lg:bottom-[8px] lg:right-[8px] sm:bottom-[5px] sm:right-[5px] xl:w-[25px] xl:h-[25px] lg:w-[20px] lg:h-[20px] sm:w-[15px] sm:h-[15px] overflow-hidden">
        {props.filetype == "image" ? (
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
    </li>
  );
};

export default Card;
