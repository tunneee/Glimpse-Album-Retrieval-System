"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "@/components/home/card";
import SectionInput from "@/components/SectionInput";
type Props = {
  id: number;
  link: string;
  date: string;
  type: string;
  thumnail? : string | undefined,

};
type CardProps = {
  link : string,
  type : string,
  id :  number,
  thumnail : string | null,
}
const Album = () => {
  const data = [
    {
      id: 1,
      link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 2,
      link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 3,
      link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 4,
      link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 5,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "image"
    },
    {
      id: 6,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "image"
    },
    {
      id: 7,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "image"
    },
    {
      id: 8,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
      type: "image"
    },
    {
      id: 9,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
      type: "image"
    },
    {
      id: 10,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
      type: "image"
    },
    {
      id: 11,
      link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
  ];

  var listCard : Array<CardProps> = [];
  return (
    < > 
      {data?.map((element: Props, index: number) => {
        listCard.push({link : element.link, type : element.type , id : element.id , thumnail : element.thumnail  ? element.thumnail : ""});
        if (element.date != data[index + 1]?.date || index == data.length - 1) {
          const date = element.date.split("/");
          const list = listCard;
          listCard = [];
          return (
            <div key={element.id} className="flex flex-col xl:gap-[10px]">
              <h2 className="font-[600] text-[22px]">
                Ngày {date[0]}, tháng {date[1]}, năm {date[2]}
              </h2>
              <ul id="list" className="flex justify-start xl:gap-[10px]">
                {list.map((card : CardProps)=>(
                  <Card thumnail={card.thumnail} id={card.id} key={card.id} link={card.link} type={card.type} ></Card>
                ))}
              </ul>
            </div>
          );
        }
      })}
      <SectionInput></SectionInput>
    </>
  );
};

export default Album;
