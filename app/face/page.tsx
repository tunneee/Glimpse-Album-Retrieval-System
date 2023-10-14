"use client";
import SectionInput from "@/components/SectionInput";
import Card from "@/components/home/card";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
const index = () => {
  let listCard : any = [];
   const data = [
    {
      id: 1,
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      timestamp: 10020111,
      filetype: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 2,
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      timestamp: 10020111,
      filetype: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 3,
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      timestamp: 10020111,
      filetype: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 4,
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      timestamp: 10020111,
      filetype: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
    {
      id: 5,
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      timestamp: 10020111,
      filetype: "image"
    },
    {
      id: 6,
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      timestamp: 10020111,
      filetype: "image"
    },
    {
      id: 7,
      url: "https://wallpapercave.com/wp/wp4854990.jpg",
      timestamp: 10020111,
      filetype: "image"
    },
    {
      id: 8,
      url: "https://wallpapercave.com/wp/wp9102200.jpg",
      timestamp: 10020111,
      filetype: "image"
    },
    {
      id: 9,
      url: "https://wallpapercave.com/wp/wp9102200.jpg",
      timestamp: 10020111,
      filetype: "image"
    },
    {
      id: 10,
      url: "https://wallpapercave.com/wp/wp9102200.jpg",
      timestamp: 10020111,
      filetype: "image"
    },
    {
      id: 11,
      url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      timestamp: 10020111,
      filetype: "video",
      thumnail : "https://wallpapercave.com/wp/wp5148950.jpg"
    },
  ].sort((a : any, b : any) =>{
    if(a.timestamp > b.timestamp) return 1;
    return -1;
  });

  return (
    <>
      {data?.map((element: any, index: number) => {
         const times = new Date(element.timestamp);
         const timesNextElement = new Date(data[index  + 1]?.timestamp);
        listCard.push({
          url: element?.payload?.url || element.url,
          filetype: element?.payload?.filetype || element.filetype,
          id: element?.id,
          thumnail: element?.payload?.thumnail || "",
        });
        if (
          times.getDate() != timesNextElement.getDate() ||  index == data.length - 1
        ) {
          listCard = [];
          return (
            <div key={element.id} className="flex flex-col lg:gap-[10px]">
              <div className="flex gap-[10px] w-fit items-center justify-between">
                <h2 className="font-[600] lg:text-[22px] md:text-[18px]">
                  Họ Và Tên
                </h2>
                <EditIcon ></EditIcon>
              </div>
              <ul
                id="list"
                className="flex justify-start md:gap-[10px] sm:gap-[8px] flex-wrap "
              >
                {listCard.map((card: any) => (
                  <Card
                    id={card.id}
                    key={card.id}
                    url={card.url}
                    filetype={card.filetype}
                  ></Card>
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

export default index;
