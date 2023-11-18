/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState, useContext } from "react";
import Card from "@/components/home/card";
import Image from "next/image";
import { Button } from "@mui/material";
import SectionInput from "@/components/SectionInput";
import { context } from "@/components/contextProvide";
import axios from "axios";
type ImageProps = {
  id: string;
  payload: {
    url: string;
    timestamp: number;
    filetype: string;
    video_url?: string | undefined;
    video_id?: string | undefined;
    times: number;
    fps: number;
    frame_idx: number;
  };
};
const Index = () => {
  const [render, reRender] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const { API } = useContext(context);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [listAnswer, setListAnswer] = useState(() => {
    const result = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("answer") || "[false]"
        : "[false]"
    );
    return result;
  });
  const getNewAnswer = async (result: string) => {
    try {
      await axios
        .get(`${API}/search/${result}`, {
          headers: { "ngrok-skip-browser-warning": 123 },
        })
        .then((res) => {
          setData(res.data.points);
          setLoading(true);
          // typeof window !== "undefined"
          // ?
          localStorage.setItem(result, JSON.stringify(res.data.points));
          // : null;
        });
    } catch (err) {}
  };
  const removeAnswer = (index: number, element: string) => {
    setListAnswer(listAnswer.toSpliced(index, 1));
    if (!listAnswer.find((answer: string) => answer === element))
      localStorage.removeItem(element);
  };
  const getListImgForRequest = (index: number, request: string) => {
    if (index !== 0 || isLoading)
      return JSON.parse(localStorage.getItem(request) || "[]");
    return Array(6).fill(1);
  };
  useEffect(() => {
    const result = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("answer") || "[]"
        : "[]"
    );
    localStorage.setItem("answer", JSON.stringify(listAnswer));
    getNewAnswer(result[0]);
  }, [listAnswer]);
  return (
    <>
      {listAnswer?.map((element: string, index: number) => {
        const arr = getListImgForRequest(index, element);
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
              No search history yet
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
                    removeAnswer(index, element);
                  }}
                  variant="contained"
                  className="mr-[5px] bg-[#0098FF]"
                >
                  Xóa
                </Button>
              </div>
              <ul className="flex w-full min-h-[50px] md:gap-[10px] sm:gap-[5px] flex-wrap">
                {(index === 0 && !isLoading) || arr.length != 0 ? (
                  arr?.map((image: ImageProps, i: number) => {
                    return (
                      <Card
                        isLoading={index === 0 && !isLoading ? false : true}
                        answer={element}
                        key={image?.id}
                        id={`${image?.id}${index}${i}` || `${index}${i}`}
                        url={image?.payload?.url}
                        filetype={image?.payload?.filetype}
                        times={image?.payload?.frame_idx / image?.payload?.fps}
                        video_id={image?.payload?.video_id}
                        video_url={image?.payload?.video_url}
                        timestamp={image?.payload?.timestamp}
                      ></Card>
                    );
                  })
                ) : (
                  <div className="w-full flex justify-center py-[20px]">
                    <p>
                      So sorry, may be your input is wrong or we don't have
                      image for this.
                    </p>
                  </div>
                )}
              </ul>
            </div>
          );
        }
      })}
      <SectionInput
        setLoading={setLoading}
        setListAnswer={setListAnswer}
      ></SectionInput>
    </>
  );
};

export default Index;
