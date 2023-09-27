import React, { useRef } from "react";
import Image from "next/image";
import Card from "../card";
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
      id: 1,
      link: "https://wallpapercave.com/wp/wp5148950.jpg",
      date: "20/09/2004",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp5148950.jpg",
      date: "20/09/2004",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp4854990.jpg",
      date: "30/09/2004",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
    {
      id: 1,
      link: "https://wallpapercave.com/wp/wp9102200.jpg",
      date: "26/09/2023",
    },
  ];
  const card = useRef(null);
  return (
    <section className="h-[calc(100%-10px)] w-full flex overflow-y-scroll flex-col bg-[#fff] rounded-[20px] xl:pt-[40px] xl:pl-[40px] gap-[20px]">
      {data?.map((element: Props, index: number) => {
        const nextElement = data[index  +1];
        console.log('nextElement', nextElement)
        if (element.date != data[index + 1]?.date ) {
          const date = element.date.split("/");
          return (
            <>
              <h2 className="font-[600] text-[22px]">
                Ngày {date[0]}, tháng {date[1]}, năm {date[2]}
              </h2>
              <div ref={card} className="flex justify-start">
                <Card
                  link={"https://wallpapercave.com/wp/wp5148950.jpg"}
                ></Card>
              </div>
            </>
          );
        }
        return <></>;
      })}
    </section>
  );
};

export default Album;
