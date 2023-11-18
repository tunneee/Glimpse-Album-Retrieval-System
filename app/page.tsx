"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../assets/images/logo/logo.svg";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { motion } from "framer-motion";
import album from "../assets/images/user_manual/album.png";
import result from "../assets/images/user_manual/result.png";
import inputbar from "../assets/images/user_manual/inputbar.png";
import toolbar from "../assets/images/user_manual/toolbar.png";
import face from "../assets/images/user_manual/face.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { Particles_option } from "@/components/particles/index";
import { loadFull } from "tsparticles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const variants = {
  animate: (page: number) => ({
    x: `-${page * 20}%`,
    Transition: {
      type: "easeInOut",
      duration: 1,
    },
  }),
};
const duration = Array(50)
  .fill(0)
  .map((number) => (number = Math.floor(Math.random() * 10 + 300)));
const random = Array(50)
  .fill(0)
  .map((number) => (number = Math.floor(Math.random() * 360)));
const Page = () => {
  const currentPage = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [screen, setScreen] = React.useState<number>(window.screen.width);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const particlesInit = useCallback(async (engine: any) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {}, []);
  const effect = {
    animate: (index: number) => ({
      rotate: [random[index], random[index] + 360],
      transition: {
        type: "linear",
        scale: index + 1,
        delay: 0,
        times: [0, 1],
        duration: duration[index],
        repeat: Infinity,
      },
    }),
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePage = (number: number) => {
    setPage(number);
  };
  React.useEffect(() => {
    window.addEventListener("resize", (event) => {
      const target = event.target as Window;
      setScreen(target.innerWidth);
    });
  }, []);
  return (
    <>
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={Particles_option}
      ></Particles>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={"xl"}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className=""
      >
        <DialogTitle>How to use Glimpse ?</DialogTitle>
        <DialogContent className=" p-[10px_20px] xl:w-[1240px] lg:w-[940] aspect-[1/1] overscroll-none ">
          <div className="w-full h-full overflow-hidden ">
            <motion.ul
              custom={page}
              animate="animate"
              variants={variants}
              className={`flex h-full w-[500%]`}
            >
              <li className="w-1/5 h-full">
                <Image
                  src={album}
                  alt="album"
                  width={1400}
                  height={900}
                  className="w-full h-full"
                ></Image>
              </li>
              <li className="w-1/5 h-full">
                <Image
                  src={toolbar}
                  alt="album"
                  width={1400}
                  height={900}
                  className="w-full h-full"
                ></Image>
              </li>

              <li className="w-1/5 h-full">
                <Image
                  src={inputbar}
                  alt="album"
                  width={1400}
                  height={900}
                  className="w-full h-full"
                ></Image>
              </li>

              <li className="w-1/5 h-full">
                <Image
                  src={result}
                  alt="album"
                  width={1400}
                  height={900}
                  className="w-full h-full"
                ></Image>
              </li>

              <li className="w-1/5 h-full">
                <Image
                  src={face}
                  alt="album"
                  width={1400}
                  height={900}
                  className="w-full h-full"
                ></Image>
              </li>
            </motion.ul>
          </div>
        </DialogContent>
        <DialogActions className=" w-full">
          <div className="flex justify-between relative px-[20px] w-full">
            <div className="flex justify-between w-1/2">
              <Link className="text-[#202020]" href={"album"}>
                I understand
              </Link>
              <ul
                className={`absolute bottom-0 left-1/2 translate-x-[-50%] flex gap-[10px]`}
              >
                <li>
                  <button
                    value={0}
                    onClick={({ target }) =>
                      handlePage(Number((target as HTMLButtonElement).value))
                    }
                    className={`aspect-[1/1] w-[15px] rounded-full ${
                      page === 0 ? "bg-[#202020]" : "bg-[#20202048]"
                    }`}
                  ></button>
                </li>
                <li>
                  <button
                    value={1}
                    onClick={({ target }) =>
                      handlePage(Number((target as HTMLButtonElement).value))
                    }
                    className={`aspect-[1/1] w-[15px] rounded-full ${
                      page === 1 ? "bg-[#202020]" : "bg-[#20202048]"
                    }`}
                  ></button>
                </li>
                <li>
                  <button
                    value={2}
                    onClick={({ target }) =>
                      handlePage(Number((target as HTMLButtonElement).value))
                    }
                    className={`aspect-[1/1] w-[15px] rounded-full ${
                      page === 2 ? "bg-[#202020]" : "bg-[#20202048]"
                    }`}
                  ></button>
                </li>
                <li>
                  <button
                    value={3}
                    onClick={({ target }) =>
                      handlePage(Number((target as HTMLButtonElement).value))
                    }
                    className={`aspect-[1/1] w-[15px] rounded-full ${
                      page === 3 ? "bg-[#202020]" : "bg-[#20202048]"
                    }`}
                  ></button>
                </li>
                <li>
                  <button
                    value={4}
                    onClick={({ target }) =>
                      handlePage(Number((target as HTMLButtonElement).value))
                    }
                    className={`aspect-[1/1] w-[15px] rounded-full ${
                      page === 4 ? "bg-[#202020]" : "bg-[#20202048]"
                    }`}
                  ></button>
                </li>
              </ul>
            </div>
            <Button
              onClick={() => {
                if (page < 4) handlePage(page + 1);
                else {
                  router.push("/album");
                  router.forward();
                }
              }}
              variant="contained"
            >
              {page !== 4 ? "Next" : "Go to album"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div className="flex pointer-events-none flex-col justify-center gap-[60px] items-center z-10 ">
        <div className="flex justify-center gap-[10px]">
          <Image
            src={logo}
            alt="logo glimpse"
            width={100}
            height={100}
            className="aspect-[1/1] lg:w-[100px] md:w-[75px] sm:w-[100px]"
          ></Image>
          <h1 className="font-[700] lg:text-[100px] md:text-[75px] sm:text-[50px] text-[#202020] ">
            GLIMPSE
          </h1>
        </div>
        <div className="flex justify-between lg:gap-[40px] md:gap-[30px] sm:gap-[20px]">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="p-[10px_20px] lg:text-[24px] md:text-[20px] sm:text-[16px] font-[500] hover:underline"
          >
            User manual
          </button>
          <a
            href={"./album"}
            className="group p-[10px_20px] pointer-events-auto lg:text-[24px] md:text-[20px] sm:text-[16px] relative font-[500] border-[2px] border-[#202020] rounded-full overflow-hidden"
          >
            <p className="z-10 absolute whitespace-nowrap text-[#202020] top-1/2 left-1/2 translate-x-[-50%] font-[500] transition-transform ease-in duration-300 delay-100 translate-y-[-50%] group-hover:translate-y-[-200%]">
              Go to album
            </p>
            <p className="z-10 absolute whitespace-nowrap text-[#fff] top-1/2 left-1/2 translate-x-[-50%] font-[500] transition-transform ease-in duration-300 translate-y-[200%] delay-100 group-hover:translate-y-[-50%]">
              Go to album
            </p>
            <p className="opacity-0">Go to album</p>
            <span className="z-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-[#202020] aspect-[1/1] origin-center lg:w-[200px] md:w-[175px] sm:w-[150px] scale-0 transition-transform ease-out duration-700 group-hover:scale-[100%]"></span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Page;
