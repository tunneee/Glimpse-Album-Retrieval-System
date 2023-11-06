"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  Album,
  Result,
  Face,
  Setting,
  Map,
} from "../../assets/images/header/index";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
const variants: any = {
  animetion: ({ y }: { y: number }) => {
    return {
      y: y,
      transition: {
        type: "spring",
        bounce: 0.1,
      },
    };
  },
};
const button = {
  focus: {
    scale: [0.8, 1],
    transition: {
      type: "spring",
      bounce: 0.3,
    },
  },
  not: {
    scale: 1,
  },
};
const menu = {
  is: {
    height: 320,
    transition: {
      type: "spring",
      bounce: 0.5,
    },
  },
  not: {
    height: 40,
    rotate: 0,
  },
  rotate: {
    rotate: 45,
  },
};
function Index({
  url,
  action,
  setAction,
}: {
  url: string;
  action: { y: number; action: number };
  setAction: any;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const album = useRef<HTMLLIElement>(null);
  const result = useRef<HTMLLIElement>(null);
  const face = useRef<HTMLLIElement>(null);
  const setting = useRef<HTMLLIElement>(null);
  const map = useRef<HTMLLIElement>(null);
  const [positionEachElement, setPositionEachElement] = useState({
    album: {
      y: 0,
      action: 1,
    },
    result: {
      y: result?.current?.offsetTop != 0 ? result?.current : 67,
      action: 2,
    },
    face: {
      y: face?.current?.offsetTop != 0 ? face?.current : 133,
      action: 3,
    },
    map: {
      y: map?.current?.offsetTop != 0 ? map?.current : 133,
      action: 4,
    },
    setting: {
      y: setting?.current?.offsetTop != 0 ? setting?.current : 133,
      action: 5,
    },
  });

  const [status, setStatus] = useState<{
    album: boolean;
    result: boolean;
    face: boolean;
    setting: boolean;
    map: boolean;
  }>({ album: true, result: false, face: false, setting: false, map: false });
  useEffect(() => {
    window.addEventListener("wheel", () => {
      setOpen(false);
    });
  }, [isOpen]);
  const updatePositionEachElement = (currentUrl: string) => {
    switch (currentUrl) {
      case "/album":
        setAction((): any => {
          const { offsetTop }: any = album?.current || 0;
          return { y: offsetTop, action: 1 };
        });
        break;
      case "/result":
        setAction((): any => {
          const { offsetTop }: any =
            result?.current?.offsetTop != 0 ? result?.current : 67;
          return { y: offsetTop || 67, action: 2 };
        });
        break;
      case "/face":
        setAction((): any => {
          const { offsetTop }: any =
            face?.current?.offsetTop != 0 ? face?.current : 133;
          return { y: offsetTop || 133, action: 3 };
        });
        break;
      case "/map":
        setAction((): any => {
          const { offsetTop }: any =
            map?.current?.offsetTop != 0 ? map?.current : 133;
          return { y: offsetTop || 133, action: 4 };
        });
        break;
      case "/setting":
        setAction((): any => {
          const { offsetTop }: any =
            setting?.current?.offsetTop != 0 ? setting?.current : 200;
          return { y: offsetTop || 200, action: 5 };
        });
        break;
    }
  };

  useEffect(() => {
    updatePositionEachElement(url);
    window.addEventListener("resize", () => {
      updatePositionEachElement(url);
    });
  }, [url]);
  return (
    <nav>
      <div className="xl:min-w-[180px] pl-[20px] lg:min-w-[160px] md:min-w-[140px] md:block sm:w-[30px] sm:top-[50px] sm:left-[20px]  sm:hidden  py-[60px] h-full bg-[#202020] overflow-hidden">
        <ul className="relative flex flex-col justify-between text-[#fff] h-full xl:w-[160px] lg:w-[140px] md:w-[120px] max-h-[750px]">
          <motion.div
            animate={"animetion"}
            custom={action}
            variants={variants}
            className={`absolute w-full rounded-[40px_0px_0_40px] bg-[#fff] lg:h-[75px] md:h-[50px] z-[1]`}
          >
            <div className="absolute right-0  lg:w-[30px] md:w-[20px] aspect-[1/1] bg-[#202020] rounded-full bottom-[100%] lg:shadow-[16px_16px_0_0px_#fff] md:shadow-[10px_10px_0_0_#fff]"></div>
            <div className="absolute right-0  lg:w-[30px] md:w-[20px] aspect-[1/1]  bg-[#202020] rounded-full top-[100%]  lg:shadow-[16px_-16px_0_0px_#fff] md:shadow-[10px_-10px_0_0_#fff]"></div>
          </motion.div>
          <motion.li
            animate={status.album ? "focus" : "not"}
            variants={button}
            ref={album}
            className="lg:pl-[20px] md:pl-[15px] lg:h-[75px] md:h-[50px] flex items-center z-[2]"
          >
            <motion.button
              onClick={() => {
                setStatus({
                  album: true,
                  result: false,
                  face: false,
                  setting: false,
                  map: false,
                });
                router.push("/album");
              }}
              className="flex md:gap-[10px] items-center"
            >
              <Album color={action?.action != 1 ? "#fff" : "#202020"}></Album>
              <motion.p
                className={` lg:text-[20px] md:text-[16px] font-[700] ${
                  action?.action != 1 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Album
              </motion.p>
            </motion.button>
          </motion.li>
          <motion.li
            animate={status.result ? "focus" : "not"}
            variants={button}
            ref={result}
            className=" lg:pl-[20px] md:pl-[15px] lg:h-[75px] md:h-[50px] flex items-center z-[2]"
          >
            <motion.button
              onClick={() => {
                setStatus({
                  album: false,
                  result: true,
                  face: false,
                  setting: false,
                  map: false,
                });
                router.push("/result");
              }}
              className="flex md:gap-[10px] items-center "
            >
              <Result color={action?.action != 2 ? "#fff" : "#202020"}></Result>
              <motion.p
                className={`lg:text-[20px] md:text-[16px] font-[700] ${
                  action?.action != 2 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Result
              </motion.p>
            </motion.button>
          </motion.li>
          <motion.li
            animate={status.face ? "focus" : "not"}
            variants={button}
            ref={face}
            className=" lg:pl-[20px] md:pl-[15px] lg:h-[75px] md:h-[50px] flex items-center z-[2]"
          >
            <motion.button
              onClick={() => {
                setStatus({
                  album: false,
                  result: false,
                  face: true,
                  setting: false,
                  map: false,
                });
                router.push("/face");
              }}
              className="flex md:gap-[10px] items-center"
            >
              <Face color={action?.action != 3 ? "#fff" : "#202020"}></Face>
              <motion.p
                className={` lg:text-[20px] md:text-[16px] font-[700] ${
                  action?.action != 3 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Face
              </motion.p>
            </motion.button>
          </motion.li>
          <motion.li
            animate={status.map ? "focus" : "not"}
            variants={button}
            ref={map}
            className=" lg:pl-[20px] md:pl-[15px] lg:h-[75px] md:h-[50px] flex items-center z-[2]"
          >
            <motion.button
              onClick={() => {
                setStatus({
                  album: false,
                  result: false,
                  face: false,
                  setting: false,
                  map: true,
                });
                router.push("/map");
              }}
              className="flex md:gap-[10px] items-center"
            >
              <Map color={action?.action != 4 ? "#fff" : "#202020"}></Map>
              <motion.p
                className={` lg:text-[20px] md:text-[16px] font-[700] ${
                  action?.action != 4 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Map
              </motion.p>
            </motion.button>
          </motion.li>
          <motion.li
            animate={status.setting ? "focus" : "not"}
            variants={button}
            ref={setting}
            className=" lg:pl-[20px] md:pl-[15px] lg:h-[75px] md:h-[50px] flex items-center z-[2]"
          >
            <motion.button
              onClick={() => {
                setStatus({
                  album: false,
                  result: false,
                  face: false,
                  setting: true,
                  map: false,
                });
                router.push("/setting");
              }}
              className="flex md:gap-[10px] items-center"
            >
              <Setting
                color={action?.action != 5 ? "#fff" : "#202020"}
              ></Setting>
              <motion.p
                className={` lg:text-[20px] md:text-[16px] font-[700] ${
                  action?.action != 5 ? "text-[#fff]" : "text-[#202020]"
                } transition-colors duration-100 ease-in-out delay-200 `}
              >
                Setting
              </motion.p>
            </motion.button>
          </motion.li>
        </ul>
      </div>
      <div className="md:hidden sm:top-[50px] sm:left-[20px]  flex absolute">
        <motion.div
          animate={isOpen ? "is" : "not"}
          variants={menu}
          className=" flex-col sm:w-[40px] items-center relative gap-[40px] flex pt-[10px] pb-[20px]  rounded-full z-10 bg-[#202020] overflow-hidden"
        >
          <motion.button
            animate={isOpen ? "rotate" : "not"}
            variants={menu}
            onClick={() => setOpen(!isOpen)}
            className="relative w-[20px] min-h-[20px] "
          >
            <span className="w-[8px] h-[8px] rounded-[2px] bg-[#fff] flex absolute top-0 left-0"></span>
            <span className="w-[8px] h-[8px] rounded-[2px] bg-[#fff] flex absolute top-0 right-0"></span>
            <span className="w-[8px] h-[8px] rounded-[2px] bg-[#fff] flex absolute bottom-0 left-0 "></span>
            <span className="w-[8px] h-[8px] rounded-[2px] bg-[#fff] flex absolute bottom-0 right-0"></span>
          </motion.button>
          <ul
            className={`${
              isOpen ? "flex" : "hidden"
            }  flex-col min-h-[100px] relative w-full items-center gap-[25px] justify-between bg-[#202020] h-full xl:w-[160px] lg:w-[140px] md:w-[120px] max-h-[750px]`}
          >
            <motion.div
              animate={"animetion"}
              custom={action}
              variants={variants}
              className={`absolute w-[4px] right-0 rounded-[200px_0px_0_200px] bg-[#0098FF] h-[30px] z-[1]`}
            ></motion.div>
            <motion.li
              animate={status.album ? "focus" : "not"}
              variants={button}
              className=" flex items-center z-[2]"
            >
              <motion.button
                onClick={() => {
                  setStatus({
                    album: true,
                    result: false,
                    face: false,
                    setting: false,
                    map: false,
                  });
                  router.push("/album");
                }}
                className="flex md:gap-[10px] items-center"
              >
                <Album color={"#fff"}></Album>
              </motion.button>
            </motion.li>
            <motion.li
              animate={status.result ? "focus" : "not"}
              variants={button}
              className="  flex items-center z-[2]"
            >
              <motion.button
                onClick={() => {
                  setStatus({
                    album: false,
                    result: true,
                    face: false,
                    setting: false,
                    map: false,
                  });
                  router.push("/result");
                }}
                className="flex md:gap-[10px] items-center "
              >
                <Result color="#fff"></Result>
              </motion.button>
            </motion.li>
            <motion.li
              animate={status.face ? "focus" : "not"}
              variants={button}
              className=" flex items-center z-[2]"
            >
              <motion.button
                onClick={() => {
                  setStatus({
                    album: false,
                    result: false,
                    face: true,
                    setting: false,
                    map: false,
                  });
                  router.push("/face");
                }}
                className="flex md:gap-[10px] items-center"
              >
                <Face color="#fff"></Face>
              </motion.button>
            </motion.li>
            <motion.li
              animate={status.map ? "focus" : "not"}
              variants={button}
              className=" flex items-center z-[2]"
            >
              <motion.button
                onClick={() => {
                  setStatus({
                    album: false,
                    result: false,
                    face: false,
                    setting: false,
                    map: true,
                  });
                  router.push("/map");
                }}
                className="flex md:gap-[10px] items-center"
              >
                <Map color="#fff"></Map>
              </motion.button>
            </motion.li>
            <motion.li
              animate={status.setting ? "focus" : "not"}
              variants={button}
              className=" flex items-center z-[2]"
            >
              <motion.button
                onClick={() => {
                  setStatus({
                    album: false,
                    result: false,
                    face: false,
                    setting: true,
                    map: false,
                  });
                  router.push("/setting");
                }}
                className="flex md:gap-[10px] items-center"
              >
                <Setting color="#fff"></Setting>
              </motion.button>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </nav>
  );
}

export default Index;
