import Image from "next/image";
import React from "react";

const ButtonArrow = ({ icon, disable, onClick, left, right }: any) => {
  return (
    <button
      onClick={onClick}
      className={`${disable ? "lg:hidden" : "lg:flex"} ${left ? "left-[5px]" : ""} ${right ? "right-[5px]" : ""} hidden w-[50px] z-10  items-center justify-center cursor-pointer aspect-[1/1] rounded-full absolute top-1/2  translate-y-[-50%] bg-[#2020206c]`}
    >
      <Image src={icon} alt="arrow left" className="text-[#fff]"></Image>
    </button>
  );
};

export default ButtonArrow;
