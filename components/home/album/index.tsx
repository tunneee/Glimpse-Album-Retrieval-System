import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Card from "../card";
import SectionInput from "@/components/SectionInput";
type Props = {
  id: number;
  link: string;
  date: string;
};
const Album = () => {
  const data = [
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp5148950.jpg",
      date: "20/09/2004",
    },
    {
      id: 2,
      link: "https://wallpapercave.com/wp/wp5148950.jpg",
      date: "20/09/2004",
    },
    {
      id: 3,
      link: "https://wallpapercave.com/wp/wp5148950.jpg",
      date: "20/09/2004",
    },
    {
      id: 4,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 5,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 6,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 7,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 8,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
    {
      id: 9,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
    {
      id: 10,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
    {
      id: 11,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
  ];

  const card = useRef();
  useEffect(() => {
    console.log(card.current);
  }, [card]);
  var listCard : Array<string> = [];
  console.log('card', card)
  return (
    <section className=" xl:gap-[40px] overflow-x-hidden h-[calc(100%-10px)] w-full flex overflow-y-scroll flex-col bg-[#fff] rounded-[20px] xl:pt-[40px] xl:pl-[40px] ">
      {data?.map((element: Props, index: number) => {
        listCard.push(element.link);
        if (element.date != data[index + 1]?.date || index == data.length - 1) {
          const date = element.date.split("/");
          const list = listCard;
          listCard = [];
          return (
            <div key={element.id} className="flex flex-col xl:gap-[10px]">
              <h2 className="font-[600] text-[22px]">
                Ngày {date[0]}, tháng {date[1]}, năm {date[2]}
              </h2>
              <div id="list" className="flex justify-start xl:gap-[10px]">
                {list.map((link : string)=>(
                  <Card key={link} link={link}></Card>
                ))}
              </div>
            </div>
          );
        }
      })}
      <SectionInput></SectionInput>
    </section>
  );
};

export default Album;
