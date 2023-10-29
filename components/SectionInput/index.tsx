"use client";
import React, { useEffect, useRef, useState } from "react";
import mic from "@/assets/images/section__input/mic.svg";
import { useRouter } from "next/navigation";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
const SectionInput = () => {
  const router = useRouter();
  const submitAnswer = (text: string) => {
    if (typeof window !== undefined) {
      let arr = JSON.parse(localStorage.getItem("answer") || "[]");
      arr = [text, ...arr]
      console.log('arr', arr)
      localStorage.setItem("answer", JSON.stringify(arr));
      content!.current!.innerText = "" ;
      setAutoFocus(false);
      router.push("/result");
      router.refresh()
    }
  };
  const body = document.querySelector("body");
  const content = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  
  useEffect(() => {
    if (autoFocus) return;
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
      className={` absolute bottom-[10px] h-[auto]  rounded-[0_0_0px_20px] xl:w-[800px] lg:w-[600px] md:w-[calc(100%-40px)] sm:w-[calc(100%-30px)] xl:py-[20px] lg:py-[10px] sm:py-[1.5px] md:pb-[40px] left-1/2 translate-x-[calc(-50%)]`}
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
            onKeyDown={({ key }: React.KeyboardEvent) => {
              if (key == "Enter" && autoFocus) {
                submitAnswer(text);
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
            className="relative h-full flex align-middle items-center break-words md:text-[16px] sm:text-[10px] lg:h-[25px] md:min-h-[20px] sm:min-h-full bg-[transparent] placeholder:text-[#ffffff81]  xl:w-full outline-0 caret-[#fff] text-[#fff]"
          >
            <p className="z-[2] h-[auto] min-h-full flex items-center"></p>
            <p
              spellCheck={false}
              className={`${
                autoFocus || text ? "hidden" : ""
              } h-full z-[1] md:text-[16px] flex items-center sm:text-[10px] absolute select-none top-0 left-0`}
            >
              Click the buttons or press{"  "}
              <span
                spellCheck={false}
                className={`select-none mx-[2px] p-[2px] bg-[#ffffff35] rounded-[2px]`}
              >
                Enter
              </span>{"  "}
              to send require...
            </p>
          </div>
          <span className="text-[#ffffff81] lg:block sm:hidden">
            {text.length}/2000
          </span>
        </div>
        <div className="flex lg:flex-col md:flex-row justify-between lg:gap-0 md:gap-[10px] items-center">
          <button className="flex items-center h-full lg:w-[25px] sm:w-[20px] ">
            <KeyboardVoiceIcon
              sx={{ width: "100%" }}
              className=" text-[#fff] hover:text-[#0098FF] focus:text-[#0098FF]"
            ></KeyboardVoiceIcon>
          </button>
          <button
            className="lg:w-[25px] md:w-[20px] sm:w-[20px]"
            onClick={() => {
              submitAnswer(text);
            }}
          >
            <SendRoundedIcon
              sx={{ width: "100%" }}
              className="w-full text-[#fff] hover:text-[#0098FF] focus:text-[#0098FF]"
            ></SendRoundedIcon>
          </button>
        </div>
      </div>
    </article>
  );
};

export default SectionInput;
