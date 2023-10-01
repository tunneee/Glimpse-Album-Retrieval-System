import React,{useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '../card';
import Image from 'next/image';
import { Button } from '@mui/material';
type ImageProps = {
  id: number;
  link: string;
  date: string;
  type: string;
  thumnail? : string | undefined
};
const Index = () => {
    const [render, reRender] = useState<boolean>(false);
    const listAnswer = JSON.parse(localStorage.getItem("answer") || '[false]');
    const data = [
      {
        id: 1,
        link: "https://wallpapercave.com/wp/wp4854990.jpg",
        date: "20/09/2004",
        type: "video"
      },
      {
        id: 2,
        link: "https://wallpapercave.com/wp/wp5148950.jpg",
        date: "20/09/2004",
        type: "video"
      },
      {
        id: 3,
        link: "https://wallpapercave.com/wp/wp5148950.jpg",
        date: "20/09/2004",
        type: "video"
      },
      {
        id: 4,
        link: "https://wallpapercave.com/wp/wp4854990.jpg",
        date: "30/09/2004",
        type: "video"
      },
      {
        id: 5,
        link: "https://wallpapercave.com/wp/wp4854990.jpg",
        date: "30/09/2004",
        type: "image"
      },
      {
        id: 6,
        link: "https://wallpapercave.com/wp/wp4854990.jpg",
        date: "30/09/2004",
        type: "image"
      },
      {
        id: 7,
        link: "https://wallpapercave.com/wp/wp4854990.jpg",
        date: "30/09/2004",
        type: "image"
      },
      {
        id: 8,
        link: "https://wallpapercave.com/wp/wp9102200.jpg",
        date: "26/09/2023",
        type: "image"
      },
      {
        id: 9,
        link: "https://wallpapercave.com/wp/wp9102200.jpg",
        date: "26/09/2023",
        type: "image"
      },
      {
        id: 10,
        link: "https://wallpapercave.com/wp/wp9102200.jpg",
        date: "26/09/2023",
        type: "image"
      },
      {
        id: 11,
        link: "https://wallpapercave.com/wp/wp9102200.jpg",
        date: "26/09/2023",
        type: "video"
      },
    ];
  return (
    <>  
      {listAnswer.map((element : string, index : number ) => {
        if(!element) return (
          <div className='absolute bottom-[50%] right-[50%] font-[700] text-[#202020] text-[24px] translate-y-1/2 translate-x-1/2'>Chưa có lịch sử search</div>
        ); else { 
          return (
            <div key={index} className='flex flex-col gap-[10px] '>
            <div className='flex justify-between '> 
                <h2 className='capitalize font-[700] text-[24px] text-[#202020]'>{element}</h2>
                <Button onClick={() =>{
                  let arr = JSON.parse(localStorage.getItem("answer") || '[]');
                  arr.splice(index,1);
                  localStorage.setItem("answer",JSON.stringify(arr));
                  reRender(!render);
                }} variant='contained' sx={{marginRight : "5px", backgroundColor : "#202020"}} >Xóa</Button>
              </div>
              <ul className='flex md:gap-[10px] sm:gap-[5px] flex-wrap'>
                {data.map((image : ImageProps) =>{
                  return( 
                    <Card key={image.id} id={image.id} link={image.link} type={"image"} thumnail={image.thumnail || ""} ></Card>
                  )
                })}
              </ul>
            </div>
          )
        }
      })}
    </>
  )
}

export default Index