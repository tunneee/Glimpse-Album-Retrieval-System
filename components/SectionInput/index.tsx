import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import mic from "@/assets/images/section__input/mic.svg";
import send from "@/assets/images/section__input/send.svg";
import ResultPage from "@/components/home/result"
import Image from "next/image";
import { Routes, useNavigate, Route } from "react-router-dom";
const SectionInput = () => {
  const navigate = useNavigate();
  const submitAnswer = (text : string) =>{
    navigate("/result");
    let arr =[];
    arr.push(localStorage.getItem("answer") || undefined)
    arr.push(text);
    console.log('arr', arr);
    localStorage.setItem("answer" ,arr);
  }
  const content = useRef(null);
  const [text, setText] = useState<number>(0);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);

  useEffect(() => {
    if(!autoFocus) return 
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        const current = content?.current as unknown as HTMLDivElement;
        current.focus();
        e.preventDefault();
        setAutoFocus(true);
      }
    });
  }, [content]);
  return (
    <article
      id="blur"
      className={`absolute bottom-[10px] left-[160px] right-[20px] rounded-[0_0_0px_20px] xl:py-[20px] xl:px-[180px] `}
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
              if(key == "Enter") {
              const current = content?.current as unknown as HTMLDivElement;
                submitAnswer(current.innerText)
              }
            }}
            onBlur={() => {
              setAutoFocus(false);
            }}
            spellCheck="true"
            onInput={() => {
              const innerText = (content?.current as unknown as HTMLDivElement)
                .innerText;
              setText(innerText.length || 0);
            }}
            contentEditable="true"
            placeholder="Nhấp Enter để nhập"
            id="content"
            className="relative h-[25px] bg-[transparent] placeholder:text-[#ffffff81]  xl:w-full outline-0 caret-[#fff] text-[#fff]"
          >
            <p className="z-[2] h-full"></p>
            <p
              spellCheck={false}
              className={`${
                autoFocus ? "hidden" : ""
              } h-full z-[1] absolute top-0 left-0`}
            >
              Nhấp{" "}
              <span 
                spellCheck={false}
                className={`  p-[5px] bg-[#ffffff35] rounded-[5px]`}>
                Enter
              </span>{" "}
              để nhập
            </p>
          </div>
          <span className="text-[#ffffff81]">{text}/2000</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <button>
            <Image src={mic} alt="mic" width={20} height={25}></Image>
          </button>
          <button>
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
