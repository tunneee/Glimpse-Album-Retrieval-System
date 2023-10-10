"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Card from "@/components/home/card";
import SectionInput from "@/components/SectionInput";
import { QdrantClient } from "@qdrant/js-client-rest";
const fetchs = require("node-fetch");
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
    thumnail?: string | null;
  };
  vector: Array<number>;
};
type CardProps = {
  url: string;
  filetype: string;
  id: string;
  thumnail?: string | null;
};
const Album = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetch = require("node-fetch");
    fetch(
      "https://f886b6fb-08df-40df-ae3b-1dd12ad1dd66.us-east4-0.gcp.cloud.qdrant.io:6333/collections/Glimpse/points/scroll",
      {
        headers: {
          "api-key": "pdpj-xK7Mep46nvAv_A2Zv-fPTVTWvs3gcXUwSb1fte5sDZve4NtCg",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          filter: {},
          limit: 1,
          with_payload: true,
          with_vector: false,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(JSON.stringify(data)));

    // .then((res: any) => {
    //   setData(() => {
    //     const api = res.data.result.points.sort((a: any, b: any) => {
    //       if (a.payload.timestamp < b.payload.timestamp) return -1;
    //       if (a.payload.timestamp > b.payload.timestamp) return 1;
    //     });
    //     return api;
    //   });
    // });
  }, []);
  // //   // const data = [
  // //   //   {
  // //   //     id: 1,
  // //   //     link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  // //   //     date: "20/09/2004",
  // //   //     type: "video",
  // //   //     thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
  // //   //   },
  // //   //   {
  // //   //     id: 2,
  // //   //     link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  // //   //     date: "20/09/2004",
  // //   //     type: "video",
  // //   //     thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
  // //   //   },
  // //   //   {
  // //   //     id: 3,
  // //   //     link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  // //   //     date: "20/09/2004",
  // //   //     type: "video",
  // //   //     thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
  // //   //   },
  // //   //   {
  // //   //     id: 4,
  // //   //     link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  // //   //     date: "20/09/2004",
  // //   //     type: "video",
  // //   //     thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
  // //   //   },
  // //   //   {
  // //   //     id: 5,
  // //   //     link: "https://wallpapercave.com/wp/wp4854990.jpg",
  // //   //     date: "30/09/2004",
  // //   //     type: "image"
  // //   //   },
  // //   //   {
  // //   //     id: 6,
  // //   //     link: "https://wallpapercave.com/wp/wp4854990.jpg",
  // //   //     date: "30/09/2004",
  // //   //     type: "image"
  // //   //   },
  // //   //   {
  // //   //     id: 7,
  // //   //     link: "https://wallpapercave.com/wp/wp4854990.jpg",
  // //   //     date: "30/09/2004",
  // //   //     type: "image"
  // //   //   },
  // //   //   {
  // //   //     id: 8,
  // //   //     link: "https://wallpapercave.com/wp/wp9102200.jpg",
  // //   //     date: "26/09/2023",
  // //   //     type: "image"
  // //   //   },
  // //   //   {
  // //   //     id: 9,
  // //   //     link: "https://wallpapercave.com/wp/wp9102200.jpg",
  // //   //     date: "26/09/2023",
  // //   //     type: "image"
  // //   //   },
  // //   //   {
  // //   //     id: 10,
  // //   //     link: "https://wallpapercave.com/wp/wp9102200.jpg",
  // //   //     date: "26/09/2023",
  // //   //     type: "image"
  // //   //   },
  // //   //   {
  // //   //     id: 11,
  // //   //     link: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  // //   //     date: "20/09/2004",
  // //   //     type: "video",
  // //   //     thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
  // //   //   },
  // //   // ].sort((a : any, b : any) =>(b.date.split('/').reverse().join('/').localeCompare(a.date.split('/').reverse().join('/'))));

  // //   var listCard: Array<CardProps> = [];
  return (
    <></>
    // <>
    //   {data?.map((element: Props, index: number) => {
    //     const times = new Date(element.payload.timestamp);
    //     const timesNextElement = new Date(data[index + 1].payload.timestamp);
    //     listCard.push({
    //       url: element.payload.url,
    //       filetype: element.payload.filetype,
    //       id: element.id,
    //       thumnail: element?.payload.thumnail || "",
    //     });
    //     if (
    //       times.getDate() != timesNextElement.getDate() ||
    //       index == data.length - 1
    //     ) {
    //       listCard = [];
    //       return (
    //         <div key={element.id} className="flex flex-col lg:gap-[10px]">
    //           <h2 className="font-[600] lg:text-[22px] md:text-[18px]">
    //             Ngày {times.getDate()}, tháng {times.getMonth()}, năm{" "}
    //             {times.getFullYear()}
    //           </h2>
    //           <ul
    //             id="list"
    //             className="flex justify-start md:gap-[10px] sm:gap-[8px] flex-wrap "
    //           >
    //             {listCard.map((card: CardProps) => (
    //               <Card
    //                 thumnail={card?.thumnail || ""}
    //                 id={card.id}
    //                 key={card.id}
    //                 url={card.url}
    //                 filetype={card.filetype}
    //               ></Card>
    //             ))}
    //           </ul>
    //         </div>
    //       );
    //     }
    //   })}
    //   <SectionInput></SectionInput>
    // </>
  );
};

export default Album;
