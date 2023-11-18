import { createContext, useState, useEffect } from "react";
const context = createContext({
  open: false,
  setOpen: (open: boolean): void => undefined,
  setView: (view: boolean): void => undefined,
  view: false,
  API: "https://fd57-116-105-165-46.ngrok-free.app",
});
const Provide = ({ children }: { children: React.ReactNode }) => {
  const API = "https://fd57-116-105-165-46.ngrok-free.app";
  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const setOpenTrue = () => {
    setOpen(true);
  };
  const setOpenFalse = () => {
    setOpen(false);
  };

  const value = {
    open,
    setOpen,
    setView,
    view,
    API,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export { Provide, context };
