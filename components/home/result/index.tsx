import React from 'react'
import { useLocation } from 'react-router-dom'
const Index = () => {
  const listAnswer = localStorage.getItem("answer");
  return (
    <div  className='h-[calc(100%-10px)] w-full flex flex-col bg-[#fff] rounded-[20px] xl:pt-[40px] xl:pl-[40px] gap-[20px]'>{answer}</div>
  )
}

export default Index