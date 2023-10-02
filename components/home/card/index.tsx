"use client";
import Image from "next/image";
import React from "react";
import imageIcon from "@/assets/images/home/image.svg";
import videoIcon from "@/assets/images/home/video.svg";
import { useState } from "react";
import Link from "next/link";
type Props = {
  link: string;
  type: string;
  id: number;
  thumnail: string | null;
};
const Card = (props: Props) => {
  const [isplay, setplay] = useState<boolean>(false);
  return (
    <li className="cursor-pointer hover:shadow-[0_0_10px_0px_#202020] transition-shadow duration-200 ease-in-out lg:rounded-[20px] sm:rounded-[10px] relative aspect-[1/1] xl:w-[170px] lg:w-[calc((100%-40px)/5)] shadow-[4px_4px_4px_0_rgba(32,32,32,0.25)] overflow-hidden">
      {props.type == "image" ? (
        <picture>
          <Image
            src={props.link}
            alt="anh"
            width={170}
            height={170}
            className="object-cover  w-[100%] h-[100%]"
          ></Image>
        </picture>
      ) : (
        <Link href={`/album/video/${props.id}`}>
          <video
            width={170}
            height={170}
            muted
            poster={isplay ? "" : props.thumnail || ""}
            className="object-cover  w-[100%] h-[100%]"
            id={`video${props.id}`}
            onMouseEnter={(e) => {
              const video: HTMLMediaElement | null = document.querySelector(
                `#video${props.id}`
              );
                video?.play();
                setplay(true);
            }}
            onMouseLeave={() => {
              const video: HTMLMediaElement | null = document.querySelector(`#video${props.id}`);
                video?.pause()
                video?.load();
                setplay(false);
            }}
          >
            <source src={props.link} type="video/mp4" />
          </video>
        </Link>
      )}
      <span className="absolute xl:bottom-[10px] xl:right-[10px] lg:bottom-[8px] lg:right-[8px] sm:bottom-[5px] sm:right-[5px] xl:w-[25px] xl:h-[25px] lg:w-[20px] lg:h-[20px] sm:w-[15px] sm:h-[15px] overflow-hidden">
        {props.type == "image" ? (
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
