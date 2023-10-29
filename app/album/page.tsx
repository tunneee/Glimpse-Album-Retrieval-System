"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "@/components/home/card";
import SectionInput from "@/components/SectionInput";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AlertDialogSlide from "@/components/home/alert";
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
const Album = ({ setOpen, open }: { setOpen: any; open: boolean }) => {
  const fakeData = [
    {
      id: "03bfea6d-d163-4a16-bd9c-7cf6faca2d0a",
      payload: {
        filetype: "video",
        fps: 29.97002997002997,
        keyframes_url: [],
        keyframes_uuid: ["9021943e-9696-487f-90d8-ba0b39352cf6"],
        locations: { lat: 18.7637, lon: 105.7554 },
        timestamp: 1695388055.0,
      },
      vector: null,
    },
    {
      id: "03ce41f9-eff5-4184-bbb6-9ffaa23db509",
      payload: {
        filetype: "image",
        locations: {},
        timestamp: 1677399074.0,
      },
      vector: null,
    },
    {
      id: "0463be13-aa63-41be-acea-b81d4cf35558",
      payload: {
        filetype: "video",
        fps: 30.0,
        keyframes_url: [],
        keyframes_uuid: ["d308e8b4-29b2-440c-a8a3-250f4909e61d"],
        locations: { lat: 16.07559, lon: 108.16989 },
        timestamp: 1651692546.0,
      },
      vector: null,
    },
    {
      id: "049ab635-b820-4a78-a28e-c45764f9feec",
      payload: {
        filetype: "image",
        locations: { lat: 16.451180555555556, lon: 107.48658888888887 },
        timestamp: 1627780057.0,
      },
      vector: null,
    },
    {
      id: "04aa1f2d-6050-406f-99ff-b43598e91972",
      payload: {
        filetype: "image",
        locations: { lat: 15.967241666666666, lon: 108.26117777777776 },
        timestamp: 1660707057.0,
      },
      vector: null,
    },
    {
      id: "04dd30ed-871c-44c8-8fb3-5097dec78bf5",
      payload: {
        filetype: "video",
        fps: 30.0,
        keyframes_url: [],
        keyframes_uuid: ["b990aefc-4e11-44ee-9d82-0b7930d0d159"],
        locations: { lat: 16.07559, lon: 108.16989 },
        timestamp: 1651692506.0,
      },
      vector: null,
    },
    {
      id: "0504f1d3-fd22-4411-b01c-06bc9c938869",
      payload: {
        filetype: "video",
        fps: 30.0,
        keyframes_url: [],
        keyframes_uuid: ["c022b000-48a8-4135-a00f-4dd001eddf96"],
        locations: {},
        timestamp: 1695387477.0,
      },
      vector: null,
    },
  ].sort((a: any, b: any): any => {
    if (a.payload.timestamp < b.payload.timestamp) return 1;
    if (a.payload.timestamp > b.payload.timestamp) return -1;
  });
  const array = Array(50).fill(1);
  const [numberPages, setNumberPages] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([
    {
      id: "03bfea6d-d163-4a16-bd9c-7cf6faca2d0a",
      payload: {
        filetype: "video",
        fps: 29.97002997002997,
        keyframes_url: [
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_24.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_52.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_60.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_75.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_78.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_103.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_131.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_139.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_148.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/326_157.jpg",
        ],
        keyframes_uuid: [
          "9021943e-9696-487f-90d8-ba0b39352cf6",
          "66852688-ffc4-4fcf-beb2-99ae56cfb18e",
          "70c9829d-9cdd-49db-9cc4-681c71ea658c",
          "5defbac6-3835-4c5b-a30d-037cd21a91da",
          "748366ac-6496-4924-ac3b-a237bdf85e8c",
          "7face399-0ae4-4665-bc78-bc8c8b65b384",
          "d0c2ae94-b7d9-40b2-9c7e-216f74f20f42",
          "6ce55865-3f7f-442e-ba87-69a32fd96fb8",
          "c42c8904-be9b-4c87-9e45-e88021d3051b",
          "3d0d96c5-f122-403e-8529-4d55d2faee28",
        ],
        locations: {
          lat: 18.7637,
          lon: 105.7554,
        },
        timestamp: 1695388055,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/videos/326.mov",
      },
      vector: null,
    },
    {
      id: "4ed546e3-2838-4b81-9ef6-eb6a7675496e",
      payload: {
        filetype: "video",
        fps: 30,
        keyframes_url: [
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_343.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_141.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_30.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_223.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_90.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_285.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_50.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_60.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_106.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_179.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_195.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_306.jpg",
          "https://storage.googleapis.com/glimpse-compai.appspot.com/keyframes/324_404.jpg",
        ],
        keyframes_uuid: [
          "421fe0c0-9aea-4b6e-b2b5-f25af8ba2a55",
          "1f79be1e-45f0-430b-a463-bd43d929e106",
          "64af0c58-a956-4529-83fc-266fdd041a23",
          "7160b563-d9e3-4acd-ac8e-fd788b977d57",
          "274acad6-d4dc-4f4e-9bd8-27e0a0da93c9",
          "2c10ad1b-e994-4e71-b043-2b29c39b3772",
          "7da5b0ef-e103-4f6d-ada5-9d9b2e8adb6f",
          "a5323a36-c231-42c7-a110-d815ad2c17d6",
          "1cf2edee-4c1e-4f38-80f0-341ca75f8f6a",
          "b8dcab28-6678-478f-9110-2461b45b3f08",
          "0348e7fc-e413-491a-aaef-013795598ef6",
          "3d2c91a0-e331-4da6-914e-de76bb3dab9f",
          "f024a1a7-5fe2-4c3c-9bac-c2fb5335c18a",
        ],
        locations: {},
        timestamp: 1695388054,
        url: "https://storage.googleapis.com/glimpse-compai.appspot.com/videos/324.mov",
      },
      vector: null,
    },
  ]);
  const toTop = useRef<HTMLDivElement>(null);
  const HandlePages = (page: number) => {
    setPages(page);
  };
  const binarySearch = (start: number, target: number, end: number) : any => {
    if (end - start === 0) {
      return Math.floor(start / 50) ;
    }
    const mid = Math.floor((start + end) / 2);
    if (target > fakeData[mid].payload.timestamp)
      return binarySearch(start, target, mid - 1);
    if (target < fakeData[mid].payload.timestamp)
      return binarySearch(mid + 1, target, end);
  };
  const findDay = (timestamp: number) => {
    const target = binarySearch(0, timestamp, fakeData.length - 1);
    setNumberPages(target);
    console.log("target", target, timestamp);
  };
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
          const result: any = res.data.points.sort((a: any, b: any) => {
            if (a.payload.timestamp < b.payload.timestamp) return 1;
            if (a.payload.timestamp > b.payload.timestamp) return -1;
          });
          if (typeof window != "undefined")
            localStorage.setItem("points", JSON.stringify(result));
          setNumberPages(Math.floor(res.data.points.length / 50));
          setData(result);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    toTop?.current?.scrollIntoView({ behavior: "smooth" });
  }, [pages]);
  useEffect(() => {
    post();
  }, []);
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
      <AlertDialogSlide setOpen={setOpen} open={open} findDay={findDay} />
      <div ref={toTop}></div>
      {array.map((e, index: number) => {
        const position = (pages - 1) * 50 + index;
        const times = new Date(data[position]?.payload?.timestamp * 1000);
        listCard = [
          ...listCard,
          {
            url:
              data[position]?.payload?.filetype == "keyframe" ||
              data[position]?.payload?.filetype == "video"
                ? data[position]?.payload?.keyframes_url
                  ? data[position]?.payload?.keyframes_url[0]
                  : "/"
                : data[position]?.payload.url,
            id: data[position]?.id,
            filetype: data[position]?.payload?.filetype,
            video_url: data[position]?.payload?.url,
            video_id: data[position]?.payload?.video_id,
            times:
              data[position]?.payload?.frame_idx && data[position]?.payload?.fps
                ? data[position]?.payload?.frame_idx /
                  data[position]?.payload?.fps
                : 1,
            timestamp: data[position]?.payload?.timestamp,
          },
        ];
        if (
          Math.floor(data[position]?.payload?.timestamp / 86400) !=
            Math.floor(data[position + 1]?.payload?.timestamp / 86400) ||
          index == 49
        ) {
          const arr = isLoading
            ? listCard
            : Array(Math.floor(Math.random() * 5 + 1)).fill(1);
          listCard = [];
          return (
            <div
              key={data[position]?.id || index}
              className="flex flex-col lg:gap-[20px] sm:gap-[10px]"
            >
              <h2 className="font-[600] lg:text-[22px] md:text-[18px]">
                {isLoading ? (
                  `${
                    moth[times.getMonth()]
                  } ${times.getDate()} ${times.getFullYear()}`
                ) : (
                  <Skeleton width={210} height={"100%"} />
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
        }
      })}
      <ul className="flex gap-[10px] mx-[auto] items-end">
        <li className="">
          <Button
            onClick={() => {
              // HandlePages(1);
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            className="p-0 max-w-[20px] h-[40px]"
            variant="outlined"
            disabled={pages === 1 ? true : false}
          >
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </Button>
        </li>
        <li className="md:block sm:hidden">
          <Button
            onClick={() => {
              HandlePages(Number(pages - 1));
            }}
            className="p-0 max-w-[20px] h-[40px]"
            variant="outlined"
            disabled={pages === 1 ? true : false}
          >
            <NavigateBeforeIcon fontSize="small" />
          </Button>
        </li>
        <li className="">
          <Button
            onClick={() => {
              HandlePages(
                pages === 1
                  ? pages
                  : pages === numberPages
                  ? numberPages - 2
                  : pages - 1
              );
            }}
            className="p-0 max-w-[20px] h-[40px]"
            variant={`${pages == 1 ? "contained" : "outlined"}`}
          >
            {pages === 1
              ? pages
              : pages === numberPages
              ? numberPages - 2
              : pages - 1}
          </Button>
        </li>
        <li className="">
          <Button
            onClick={() => {
              HandlePages(
                pages == 1 ? 2 : pages === numberPages ? numberPages - 1 : pages
              );
            }}
            className="p-0 max-w-[20px] h-[40px]"
            variant={`${
              pages === 1 || pages === numberPages ? "outlined" : "contained"
            }`}
          >
            {pages == 1 ? 2 : pages === numberPages ? numberPages - 1 : pages}
          </Button>
        </li>
        <li className="">
          <Button
            onClick={() => {
              HandlePages(
                pages == 1 ? 3 : pages === numberPages ? numberPages : pages + 1
              );
            }}
            className="p-0 max-w-[20px] h-[40px]"
            variant={pages == numberPages ? "contained" : "outlined"}
          >
            {pages == 1 ? 3 : pages === numberPages ? numberPages : pages + 1}
          </Button>
        </li>
        <li className="md:block sm:hidden">
          <Button
            onClick={() => {
              HandlePages(pages + 1);
            }}
            className="p-0 max-w-[20px] h-[40px]"
            disabled={pages >= numberPages ? true : false}
            variant={`outlined`}
          >
            <NavigateNextIcon fontSize="small" />
          </Button>
        </li>
        <li className="">
          <Button
            onClick={() => {
              HandlePages(numberPages);
            }}
            className="p-0 max-w-[20px] h-[40px]"
            variant="outlined"
            disabled={pages == numberPages ? true : false}
          >
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </Button>
        </li>
      </ul>
      <SectionInput></SectionInput>
    </>
  );
};

export default Album;
