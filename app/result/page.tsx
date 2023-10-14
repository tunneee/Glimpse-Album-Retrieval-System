"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/home/card";
import Image from "next/image";
import { Button } from "@mui/material";
import SectionInput from "@/components/SectionInput";
import axios from "axios";
type ImageProps = {
  id: string;
  payload: {
    url: string;
    timestamp: number;
    filetype: string;
    video_url?: string | undefined;
    video_id?: string | undefined;
    times : number
    fps : number
    frame_idx : number
  };
};
const Index = () => {
  const [render, reRender] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false)
  const [listAnswer, setListAnswer] = useState(() => {
    const result = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("answer") || "[false]"
        : "[false]"
    );
    return result;
  });
  const getNewAnswer = async (result : Array<string>) =>{
    try{
      await axios
      .get(`https://glimpse.serveo.net/search/${result[0]}`)
      .then((res) => {
        setData(res.data.points);
        // typeof window !== "undefined"
        // ?
        setLoading(true)
        localStorage.setItem(result[0], JSON.stringify(res.data.points));
        // : null;
      });
    }
    catch(err) {
    }
  }
  useEffect(() => {
    const result = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("answer") || "[]"
        : "[]"
    );
    setListAnswer(result);
    getNewAnswer(result)
    reRender(!render);
  }, [localStorage.getItem("answer")]);
  return (
    <>
      {listAnswer?.map((element: string, index: number) => {
        const arr = JSON.parse(localStorage.getItem(element) || "[]");
        if (!element) {
          // typeof window !== "undefined"
          //   ?
          localStorage.setItem("answer", "");
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
                    localStorage.removeItem(element);
                    localStorage.setItem("answer", JSON.stringify(listAnswer));
                    // : null;
                    reRender(!render);
                    // }
                  }}
                  variant="contained"
                  className="mr-[5px] bg-[#0098FF]"
                >
                  Xóa
                </Button>
              </div>
              <ul className="flex relative w-full min-h-[50px] md:gap-[10px] sm:gap-[5px] flex-wrap">
                {arr == null || arr.length != 0 ? arr.map((image: ImageProps) => {
                  return (
                    <Card
                      isLoading={isLoading}
                      answer={element}
                      key={image.id}
                      id={image.id}
                      url={image.payload.url}
                      filetype={image.payload.filetype}
                      times={image.payload.frame_idx / image.payload.fps}
                      video_id={image.payload.video_id}
                      video_url={image.payload.video_url}
                      timestamp={image.payload.timestamp}
                    ></Card>
                  );
                }) : 
                (<div className="w-full flex justify-center py-[20px]">  
                    <p>So sorry, may be your input is wrong or we didn`t have image for this.</p>
                </div>)}
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
