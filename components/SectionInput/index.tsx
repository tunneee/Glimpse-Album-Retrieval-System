"use client"
import React, { useEffect, useRef, useState } from "react";
import mic from "@/assets/images/section__input/mic.svg";
import send from "@/assets/images/section__input/send.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SectionInput = () => {
  const router = useRouter();
  const submitAnswer = (text : string) =>{
    if (typeof window !== undefined) {
    let arr = JSON.parse(localStorage.getItem("answer") || '[]');
    arr.push(text)
    console.log('arr',  arr);
    localStorage.setItem("answer" ,JSON.stringify(arr));
    router.push("/result")
    }
  }
  const content = useRef(null);
  const [text, setText] = useState<string>("");
  const [autoFocus, setAutoFocus] = useState<boolean>(false);

  useEffect(() => {
    if(autoFocus) return 
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        const current = content?.current as unknown as HTMLDivElement;
        current?.focus();
        e.preventDefault();
        setAutoFocus(true);
      }
    });
  }, [content]);
  return (
    <article
      id="blur"
      className={`absolute bottom-[10px] h-[auto]  rounded-[0_0_0px_20px] xl:w-[800px] lg:w-[600px] md:w-[calc(100%-40px)] sm:w-[calc(100%-30px)] xl:py-[20px] lg:py-[10px] sm:py-[1.5px] md:pb-[40px] left-1/2 translate-x-[calc(-50%)]`}
    >
      <div className="bg-[#202020] h-[auto] gap-[10px] w-[100%] justify-between lg:h-[80px] md:min-h-[40px] flex  rounded-[10px] overflow-hidden md:px-[20px] sm:px-[10px] lg:py-[15px] md:py-[10px]">
        <div className="w-4/5 ">
          <div
            ref={content}
            onClick={(e) => {
              const current = content?.current as unknown as HTMLDivElement;
              setAutoFocus(true);
              e.preventDefault();
              current.focus();
            }}
            onKeyDown={({key} : React.KeyboardEvent )=>{
              if(key == "Enter" && autoFocus) {
                submitAnswer(text)
              }
            }}
            onBlur={() => {
              setAutoFocus(false);
            }}
            spellCheck="true"
            onInput={() => {
              const innerText = (content?.current as unknown as HTMLDivElement)
                .innerText;
              setText(innerText);
            }}
            contentEditable={true}
            id="content"
            className="relative h-full flex align-middle items-center break-words md:text-[16px] sm:text-[10px] lg:h-[25px] md:min-h-[20px] bg-[transparent] placeholder:text-[#ffffff81]  xl:w-full outline-0 caret-[#fff] text-[#fff]"
          >
            <p className="z-[2] h-[auto]"></p>
            <p
              spellCheck={false}
              className={`${
                autoFocus || text ? "hidden" : ""
              } h-full z-[1] md:text-[16px] flex items-center sm:text-[10px] absolute select-none top-0 left-0`}
            >
              Nhấp hoặc nhấn{" "}
              <span 
                spellCheck={false}
                className={`select-none p-[2px] bg-[#ffffff35] rounded-[2px]`}>
                Enter
              </span>{" "}
              để nhập
            </p>
          </div>
          <span className="text-[#ffffff81] lg:block sm:hidden">{text.length}/2000</span>
        </div>
        <div className="flex lg:flex-col md:flex-row justify-between lg:gap-0 md:gap-[10px] items-center"> 
          <button className="flex items-center h-full">
            <Image src={mic} alt="mic" width={20} height={25} className="h-full"></Image>
          </button>
          <button onClick={() =>{
             submitAnswer(text)
          }}>
            <Image
              src={send}
              alt="mic"
              width={25}
              height={20}
              className="drog-shadow-[4px_4px_4px_0_#fff]"
            ></Image>
          </button>
        </div>
      </div>
    </article>
  );
};

export default SectionInput;
