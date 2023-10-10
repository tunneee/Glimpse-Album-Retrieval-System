"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/home/card";
import Image from "next/image";
import { Button } from "@mui/material";
import SectionInput from "@/components/SectionInput";
type ImageProps = {
  id: string;
  url: string;
  date: string;
  type: string;
  thumnail?: string | undefined;
};
const Index = () => {
  const [render, reRender] = useState<boolean>(false);
  
  const [listAnswer, setListAnswer] = useState(()=>{
    const result = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("answer") || "[false]"
        : "[false]"
    );
    return result;
  })
  const data = [
    {
      id: "1",
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg",
      type: "video",
    },
    {
      id: "2",
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
    },
    {
      id: "3",
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "20/09/2004",
      type: "video",
    },
    {
      id: "4",
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "video",
    },
    {
      id: "5",
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "image",
    },
    {
      id: "6",
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "image",
    },
    {
      id: "7",
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
      type: "image",
    },
    {
      id: "8",
      url: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
      type: "image",
    },
    {
      id: "9",
      url: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
      type: "image",
    },
    {
      id: "10",
      url: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
      type: "image",
    },
    {
      id: "11",
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      date: "26/09/2023",
      type: "video",
    },
  ];
  return (
    <>
      {listAnswer?.map((element: string, index: number) => {
        if (!element) {
          // typeof window !== "undefined"
          //   ? 
          localStorage.setItem("answer", '')
            // : null;
          return (
            <div
              key={index}
              className="absolute bottom-[50%] right-[50%] font-[700] text-[#202020] text-[24px] translate-y-1/2 translate-x-1/2"
            >
              Chưa có lịch sử search
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="flex flex-col md:gap-[10px] sm:gap-[8px] "
            >
              <div className="flex justify-between ">
                <h2 className="capitalize font-[700] text-[24px] text-[#202020]">
                  {element}
                </h2>
                <Button
                  onClick={() => {
                    // if (window) {
                      listAnswer.splice(index, 1);
                      // typeof window !== "undefined"
                        // ? 
                        localStorage.setItem(
                            "answer",
                            JSON.stringify(listAnswer)
                          )
                        // : null;
                      reRender(!render);
                    // }
                  }}
                  variant="contained"
                  sx={{ marginRight: "5px", backgroundColor: "#202020" }}
                >
                  Xóa
                </Button>
              </div>
              <ul className="flex md:gap-[10px] sm:gap-[5px] flex-wrap">
                {data.map((image: ImageProps) => {
                  return (
                    <Card
                      key={image.id}
                      id={image.id}
                      url={image.url}
                      filetype={image.type}
                      thumnail={image.thumnail || ""}
                    ></Card>
                  );
                })}
              </ul>
            </div>
          );
        }
      })}
      <SectionInput></SectionInput>
    </>
  );
};

export default Index;
