"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Card from "@/components/home/card";
import SectionInput from "@/components/SectionInput";
import Skeleton from "@mui/material/Skeleton";
import { type } from "os";
type Props = {
  id: string;
  payload: {
    GPS_info: {
      Latitude: number;
      Longitude: number;
    };
    filetype: string;
    timestamp: number;
    url: string;
    keyframes_url?: string | null;
    video_url?: string | null;
    video_id?: string | null;
    fps?: number | null;
    frame_idx?: number | null;
  };
};
type CardProps = {
  url: string;
  filetype: string;
  id: string;
  thumnail?: string | null;
  times: number;
  video_url: string;
  video_id: string;
  timestamp: number;
};
const Album = () => {
  const fakeData = `[
    {
      id: "03bfea6d-d163-4a16-bd9c-7cf6faca2d0a",
      payload: {
        filetype: "video",
        fps: 29.97002997002997,
        keyframes_url: [
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_24.jpg",
        ],
        keyframes_uuid: ["9021943e-9696-487f-90d8-ba0b39352cf6"],
        locations: { lat: 18.7637, lon: 105.7554 },
        timestamp: 1695388055.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/videos/326.mov",
      },
      vector: null,
    },
    {
      id: "03ce41f9-eff5-4184-bbb6-9ffaa23db509",
      payload: {
        filetype: "image",
        locations: {},
        timestamp: 1677399074.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/images/318.jpeg",
      },
      vector: null,
    },
    {
      id: "0463be13-aa63-41be-acea-b81d4cf35558",
      payload: {
        filetype: "video",
        fps: 30.0,
        keyframes_url: [
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/814_971.jpg",
        ],
        keyframes_uuid: ["d308e8b4-29b2-440c-a8a3-250f4909e61d"],
        locations: { lat: 16.07559, lon: 108.16989 },
        timestamp: 1651692546.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/videos/814.MP4",
      },
      vector: null,
    },
    {
      id: "049ab635-b820-4a78-a28e-c45764f9feec",
      payload: {
        filetype: "image",
        locations: { lat: 16.451180555555556, lon: 107.48658888888887 },
        timestamp: 1627780057.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/images/585.JPEG",
      },
      vector: null,
    },
    {
      id: "04aa1f2d-6050-406f-99ff-b43598e91972",
      payload: {
        filetype: "image",
        locations: { lat: 15.967241666666666, lon: 108.26117777777776 },
        timestamp: 1660707057.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/images/552.JPEG",
      },
      vector: null,
    },
    {
      id: "04dd30ed-871c-44c8-8fb3-5097dec78bf5",
      payload: {
        filetype: "video",
        fps: 30.0,
        keyframes_url: [
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/816_124.jpg",
        ],
        keyframes_uuid: ["b990aefc-4e11-44ee-9d82-0b7930d0d159"],
        locations: { lat: 16.07559, lon: 108.16989 },
        timestamp: 1651692506.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/videos/816.MP4",
      },
      vector: null,
    },
    {
      id: "0504f1d3-fd22-4411-b01c-06bc9c938869",
      payload: {
        filetype: "video",
        fps: 30.0,
        keyframes_url: [
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/70_937.jpg",
        ],
        keyframes_uuid: ["c022b000-48a8-4135-a00f-4dd001eddf96"],
        locations: {},
        timestamp: 1695387477.0,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/videos/70.mov",
      },
      vector: null,
    },
  ]`;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(() => {
    if(  typeof window != "undefined") {
      if(localStorage.getItem("points")){
        setLoading(true);
        const result = JSON.parse( localStorage.getItem("points") || fakeData )
        return result;
      }
    }
  });
  const [isFetch, setFetch] = useState<boolean>(true);
  let listCard: any = [];
  const post = async () => {
    try {
      await axios
        .get(`https://glimpse.serveo.net/scroll`, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then(async (res) => {
          setLoading(true);
         
          await setData(() => {
            const result :any  = res.data.points.sort((a: any, b: any) => {
              if (a.payload.timestamp < b.payload.timestamp) return 1;
              if (a.payload.timestamp > b.payload.timestamp) return -1;
            })
            if(typeof window != "undefined" ) localStorage.setItem("points", JSON.stringify(result))
            return result ;
            }
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isFetch) return;
    setFetch(false);
    console.log("isFetch", isFetch);
    if(!isLoading) post();
  }, [isFetch]);
  const moth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      {data?.map((element: Props, index: number) => {
        const times = new Date(element?.payload?.timestamp * 1000);
        const timesNextElement =
          index < data.length - 1
            ? new Date(data[index + 1]?.payload?.timestamp * 1000)
            : new Date(-1);
        if (
          times.getDate() != timesNextElement.getDate() ||
          index == data.length - 1
        ) {
          const arr = isLoading
            ? [
                ...listCard,
                {
                  url:
                    element?.payload?.filetype == "keyframe" ||
                    element?.payload?.filetype == "video"
                      ? element?.payload?.keyframes_url
                        ? element?.payload?.keyframes_url[0]
                        : "/"
                      : element?.payload?.url,
                  id: element?.id,
                  filetype: element?.payload?.filetype,
                  video_url: element?.payload?.url,
                  video_id: element?.payload?.video_id,
                  times:
                    element?.payload?.frame_idx && element?.payload?.fps
                      ? element?.payload?.frame_idx / element?.payload?.fps
                      : 1,
                  timestamp: element?.payload?.timestamp,
                },
              ]
            : Array(Math.floor(Math.random() * 5 + 1)).fill(1);
          listCard = [];
          return (
            <div
              key={element.id}
              className="flex flex-col lg:gap-[20px] sm:gap-[10px]"
            >
              <h2 className="font-[600] lg:text-[22px] md:text-[18px]">
                {isLoading ? (
                  `${
                    moth[times.getMonth()]
                  } ${times.getDate()} ${times.getFullYear()}`
                ) : (
                  <Skeleton width={210} />
                )}
              </h2>
              <ul
                id="list"
                className="flex justify-start md:gap-[10px] sm:gap-[8px] flex-wrap "
              >
                {arr.map((card: CardProps) => (
                  <Card
                    isLoading={isLoading}
                    id={card.id}
                    key={card.id}
                    url={card.url}
                    filetype={card.filetype}
                    video_url={card.video_url}
                    video_id={card.video_id}
                    times={card.times}
                    timestamp={card.timestamp}
                  ></Card>
                ))}
              </ul>
            </div>
          );
        } else {
          listCard = [
            ...listCard,
            {
              url:
                element?.payload?.filetype == "keyframe" ||
                element?.payload?.filetype == "video"
                  ? element?.payload?.keyframes_url
                    ? element?.payload?.keyframes_url[0]
                    : "/"
                  : element?.payload.url,
              id: element?.id,
              filetype: element?.payload?.filetype,
              video_url: element?.payload?.url,
              video_id: element?.payload?.video_id,
              times:
                element?.payload?.frame_idx && element?.payload?.fps
                  ? element?.payload?.frame_idx / element?.payload?.fps
                  : 1,
              timestamp: element?.payload?.timestamp,
            },
          ];
        }
      })}
      <SectionInput></SectionInput>
    </>
  );
};

export default Album;
