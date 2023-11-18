import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { context } from "@/components/contextProvide";

const Section = ({ children }: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { view } = useContext(context);
  useEffect(() => {
    const getPosition = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", getPosition);
  }, []);
  const positionAnimation = {
    hidden: {
      x: position.x,
      y: position.y,
      scale: 0,
      transition: {
        type: "linear",
      },
    },
    show: {
      x: position.x,
      y: position.y,
      scale: 1,
      transition: {
        type: "linear",
        duration: 0.1,
      },
    },
  };
  return (
    <section className="relative h-[calc(100%-10px)]  xl:max-w-[calc(100%-240px)] lg:max-w-[calc(100%-190px)] md:max-w-[calc(100%-150px)] w-full">
      <motion.span
        id="view"
        initial="hidden"
        animate={view ? "show" : "hidden"}
        custom={position}
        variants={positionAnimation}
        className="w-[60px] aspect-[1/1] pointer-events-none flex justify-center items-center fixed top-[-30px]  left-[-30px]  z-50 p-[10px_20px] bg-[#202020] text-[#fff] font-[500]"
      >
        View
      </motion.span>
      <div className="overflow-y-scroll h-full flex flex-col bg-[#fff] lg:rounded-[20px_0_0_20px] sm:rounded-[10px_0_0_10px] xl:pt-[40px] xl:pb-[120px] xl:pl-[40px] md:p-[20px] md:pb-[120px] sm:p-[10px] sm:pb-[100px]  md:gap-[40px] sm:gap-[20px]">
        {children}
      </div>
    </section>
  );
};

export default Section;
