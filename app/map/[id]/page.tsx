"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Map = () => {
  const currentpage = usePathname();
  const id = currentpage.split("/").slice(-1);
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        src={`https://glimpse.serveo.net/map/${id}`}
      ></iframe>
    </div>
  );
};

export default Map;
