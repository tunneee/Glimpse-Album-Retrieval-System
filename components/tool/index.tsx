import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Upload, Reload, Infor, Position } from "@/assets/images/tool/index";
import { imageDb } from "./data";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { context } from "../contextProvide";
const variants = {
  is: {
    width: ["0%", "100%"],
    opacity: 1,
    borderRadius: 9999,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.2,
    },
  },
  not: {
    width: ["100%", "0%"],
    opacity: 0,
    borderRadius: 9999,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.2,
    },
  },
};
type Status = {
  upload?: string | null;
  infor?: string | null;
  position?: string | null;
  reload?: string | null;
};
function Tool({ setUpload, isUpload, screen }: any) {
  const { open, setOpen } = useContext(context);
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [status, setStatus] = useState<Status>({
    upload: null,
    infor: null,
    position: null,
    reload: null,
  });
  const uploadFile = (event: any) => {
    const imgs = event.target.files;
    if (imgs.length > 0) {
      const len = imgs.length;
      for (var i = 0; i < len; i++) {
        const extension = imgs[i].type.split("/")[0];
        if (extension == "image") {
          const imgRef = ref(imageDb, `image/${v4()}`);
          uploadBytes(imgRef, imgs[i]);
          setUpload(!isUpload);
        } else if (extension == "video") {
          console.log("1", 1);
          const imgRef = ref(imageDb, `video/${v4()}`);
          uploadBytes(imgRef, imgs[i]);
          setUpload(!isUpload);
        }
      }
    }
  };
  let waitTime: any = null;
  const [isScroll, setScroll] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("wheel", () => {
      setScroll(true);
      clearTimeout(waitTime);
      waitTime = null;
      waitTime = setTimeout(() => {
        setScroll(false);
      }, 1500);
    });
  }, [isScroll]);
  return (
    <>
      {screen >= 768 ? (
        <article
          className={`md:h-full z-50 sm:h-[30px] l  sm:hidden md:flex overflow-hidden md:static absolute right-0 bottom-[55px] justify-center   lg:py-[80px] md:py-[60px]`}
        >
          <div className="bg-[#202020]  h-full sm:w-[calc(100%-60px)]  sm:rounded-full flex md:flex-col justify-between items-center xl:w-[80px] lg:w-[50px] md:w-[30px]  md:rounded-hidden sm:px-[20px]  sm:py-0 md:px-0">
            <input
              onChange={(event) => {
                uploadFile(event);
              }}
              className="hidden"
              type="file"
              id="upload"
              accept="image/jpeg/video/mp4"
              multiple
            />
            <label
              onMouseEnter={(e: React.MouseEvent) => {
                setStatus({
                  ...status,
                  upload: "hover",
                });
              }}
              onMouseLeave={() => {
                setStatus({
                  ...status,
                  upload: null,
                });
              }}
              className=""
              htmlFor="upload"
            >
              <Upload
                className="transition-all duration-1000 lg:p-[2px] xl:w-[30px] aspect-[1/1] lg:w-[25px] sm:w-[15px] cursor-pointer "
                color={status.upload == "hover" ? "#0098FF" : "#fff"}
              ></Upload>
            </label>
            <input className="hidden" type="button" id="infor" />
            <label
              onMouseEnter={(e: React.MouseEvent) => {
                setStatus({
                  ...status,
                  infor: "hover",
                });
              }}
              onMouseLeave={() => {
                setStatus({
                  ...status,
                  infor: null,
                });
              }}
              className=""
              htmlFor="infor"
            >
              <Infor
                className=" xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer  "
                color={status.infor == "hover" ? "#0098FF" : "#fff"}
              ></Infor>
            </label>
            <input className="hidden" type="button" id="position" />
            <label
              onMouseEnter={(e: React.MouseEvent) => {
                setStatus({
                  ...status,
                  position: "hover",
                });
              }}
              onMouseLeave={() => {
                setStatus({
                  ...status,
                  position: null,
                });
              }}
              onClick={() => {
                setOpen(true);
              }}
              className=""
              htmlFor="position"
            >
              <Position
                className=" xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
                color={status.position == "hover" ? "#0098FF" : "#fff"}
              ></Position>
            </label>
            <input className="hidden" type="button" id="reload" />
            <label
              onClick={() => {
                router.forward();
              }}
              onMouseEnter={(e: React.MouseEvent) => {
                setStatus({
                  ...status,
                  reload: "hover",
                });
              }}
              onMouseLeave={() => {
                setStatus({
                  ...status,
                  reload: null,
                });
              }}
              className="relative overflow-hidden rounded-full w-[25px] aspect-[1/1] flex justify-center i"
              htmlFor="reload"
            >
              <Reload
                className="z-10 xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
                color={status.reload == "hover" ? "#0098FF" : "#fff"}
              ></Reload>
            </label>
          </div>
        </article>
      ) : (
        <article
          className={`md:h-full z-50  sm:h-[30px] left-1/2 translate-x-[-50%] sm:w-[calc(100%-60px)] rounded-full  md:hidden sm:flex overflow-hidden md:static sm:absolute bottom-[55px]  justify-center   lg:py-[80px] md:py-[60px]`}
        >
          <motion.div
            animate={isScroll ? "not" : "is"}
            variants={variants}
            className="bg-[#202020]  h-full sm: flex md:flex-col justify-between items-center xl:w-[80px] lg:w-[50px] md:w-[30px]  md:rounded-hidden sm:px-[20px]  sm:py-0 md:px-0"
          >
            <input
              onChange={(event) => {
                uploadFile(event);
              }}
              className="hidden"
              type="file"
              id="upload"
              accept="image/jpeg/jpg/video/mp4/mov"
              multiple
            />
            <label
              htmlFor="upload"
              className={`${isScroll ? "hidden" : "block"} `}
            >
              <Upload
                className=" xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
                color="#fff"
              ></Upload>
            </label>
            <input className="hidden" type="button" id="infor" />
            <label
              htmlFor="infor"
              className={`${isScroll ? "hidden" : "block"} `}
            >
              <Infor
                className=" xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer  "
                color="#fff"
              ></Infor>
            </label>
            <input className="hidden" type="button" id="position" />
            <label
              onClick={() => {
                setOpen(true);
              }}
              htmlFor="position"
              className={`${isScroll ? "hidden" : "block"} `}
            >
              <Position
                className=" xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
                color="#fff"
              ></Position>
            </label>
            <input className="hidden" type="button" id="reload" />
            <label
              onClick={() => {
                router.forward();
              }}
              htmlFor="reload"
              className={`${isScroll ? "hidden" : "block"} `}
            >
              <Reload
                className=" xl:w-[30px] aspect-[1/1] lg:w-[20px] sm:w-[15px] cursor-pointer "
                color="#fff"
              ></Reload>
            </label>
          </motion.div>
        </article>
      )}
    </>
  );
}

export default Tool;
