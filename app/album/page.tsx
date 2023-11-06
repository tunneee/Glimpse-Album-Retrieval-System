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
import { list } from "firebase/storage";
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
const Album = ({
  setOpen,
  open,
  isLoading,
  setLoading,
  isUpload,
}: {
  setOpen: any;
  open: boolean;
  isLoading: boolean;
  setLoading: any;
  isUpload: boolean;
}) => {
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
  const [data, setData] = useState<any>(
    JSON.parse(localStorage.getItem("points") || "false") || fakeData
  );
  const toTop = useRef<HTMLDivElement>(null);
  const HandlePages = (page: number) => {
    setPages(page);
  };
  const updateListCard = (listCard: any, newElementListCard: any) => {
    const newListCard = {
      url:
        newElementListCard?.payload?.filetype == "keyframe" ||
        newElementListCard?.payload?.filetype == "video"
          ? newElementListCard?.payload?.keyframes_url
            ? newElementListCard?.payload?.keyframes_url[0]
            : "/"
          : newElementListCard?.payload.url,
      id: newElementListCard?.id,
      filetype: newElementListCard?.payload?.filetype,
      video_url: newElementListCard?.payload?.url,
      video_id: newElementListCard?.payload?.video_id,
      times:
        newElementListCard?.payload?.frame_idx &&
        newElementListCard?.payload?.fps
          ? newElementListCard?.payload?.frame_idx /
            newElementListCard?.payload?.fps
          : 1,
      timestamp: newElementListCard?.payload?.timestamp,
    };
    return [...listCard, newListCard];
  };
  const isSameDate = (currentElement: any, nextElement: any, index: number) => {
    if (
      Math.floor(currentElement?.payload?.timestamp / 86400) !=
        Math.floor(nextElement?.payload?.timestamp / 86400) ||
      index == 49
    )
      return true;
    return false;
  };
  const binarySearch = (start: number, target: string, end: number): any => {
    if (end - start <= 0) {
      return start;
    }
    const mid =
      (start + end) % 2 == 1 ? (start + end + 1) / 2 : (start + end) / 2;
    if (Number(target) > data[mid].payload.timestamp)
      return binarySearch(start, target, mid - 1);
    if (Number(target) < data[mid].payload.timestamp)
      return binarySearch(mid + 1, target, end);
    if (Number(target) == data[mid].payload.timestamp) {
      return mid;
    }
  };
  const findDay = (timestamp: number) => {
    const target = binarySearch(0, timestamp.toString(), data.length - 1);
    setPages(Math.floor(target / 50) + 1);
  };
  let listCard: any = [];
  const getAlbum = async () => {
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
    getAlbum();
  }, [isUpload]);
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
      <div ref={toTop} className="w-[1px] h-[1px] absolute top-0"></div>
      {array.map((e, index: number) => {
        const position = (pages - 1) * 50 + index;
        const times = new Date(data[position]?.payload?.timestamp * 1000);
        listCard = updateListCard(listCard, data[position]);
        if (isSameDate(data[position], data[position + 1], index)) {
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
              HandlePages(1);
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
