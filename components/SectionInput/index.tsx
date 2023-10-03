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
    let arr = JSON.parse(window?.localStorage.getItem("answer") || '[]');
    arr.push(text)
    console.log('arr',  arr);
    window?.localStorage.setItem("answer" ,JSON.stringify(arr));
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
      className={`absolute bottom-[10px] left-[160px] right-[20px] rounded-[0_0_0px_20px] xl:w-[800px] lg:w-[600px] xl:py-[20px] lg:py-[10px] mx-[auto] `}
    >
      <div className="bg-[#202020] w-[100%] justify-between xl:h-[80px] flex  rounded-[10px] overflow-hidden px-[20px] py-[15px]">
        <div className="w-full">
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
            className="relative h-[25px] bg-[transparent] placeholder:text-[#ffffff81]  xl:w-full outline-0 caret-[#fff] text-[#fff]"
          >
            <p className="z-[2] h-full"></p>
            <p
              spellCheck={false}
              className={`${
                autoFocus || text ? "hidden" : ""
              } h-full z-[1] absolute top-0 left-0`}
            >
              Nhấp hoặc nhấn{" "}
              <span 
                spellCheck={false}
                className={`  p-[5px] bg-[#ffffff35] rounded-[4px]`}>
                Enter
              </span>{" "}
              để nhập
            </p>
          </div>
          <span className="text-[#ffffff81]">{text.length}/2000</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <button>
            <Image src={mic} alt="mic" width={20} height={25}></Image>
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
