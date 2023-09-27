import Image from "next/image";
import React from "react";
type Props ={
    link :string
}
const Card = (props: Props) => {
  return (
    <picture className="rounded-[20px] aspect-[1/1] xl:w-[170px] shadow-[4px_4px_4px_0_rgba(32,32,32,0.25)] overflow-hidden">
      <Image
        src={props.link}
        alt="anh"
        width={170}
        height={170}
        className="object-cover w-[100%] h-[100%]"
      ></Image>
    </picture>
  );
};

export default Card;
