"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Eyes } from "@/assets/images/login";
import Link from "next/link";
import background from "@/assets/images/login/background.jpeg";
import Image from "next/image";
const Signin = () => {
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  return (
    <section className="w-full h-full  flex justify-center bg-[#f5f5f5]  flex-wrap content-center">
      <div className="relative xl:w-[700px] xl:h-[600px] overflow-hidden shadow-[0_0_10px_-3px_#000] xl:rounded-[4px] ">
        <Image
          src={background}
          alt="background"
          width={1400}
          height={900}
        ></Image>
        <div className="xl:w-[500px] absolute right-0 top-0 px-[40px] py-[60px]  xl:h-[600px] bg-[#fff] ">
          <h1 className="font-[600] text-[28px] text-[#0098FF] font-mono">SIGN IN</h1>
          <Box className="flex mt-[40px] flex-col flex-1 gap-[60px]">
            <TextField
              id="username-input"
              label="Username"
              variant="standard"
              className="w-full"
            />

            <div className="w-full relative">
              <TextField
                id="password-input"
                type={isShowPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                className="w-full"
              />
              <div
                onClick={() => setShowPassword(!isShowPassword)}
                className={`cursor-pointer absolute bottom-0 right-[5px] before:right-[11.2px] before:contents-[''] before:shadow-[1px_0_0_1px_#fff] before:rounded-sm before:origin-center before:transition-transform ${
                  isShowPassword
                    ? "before:scale-y-[100%]"
                    : "before:scale-y-[0%]"
                } before:rotate-[45deg] before:w-[2px] before:bg-[#000] before:bottom-[-0.5px] before:absolute before:h-[25px]`}
              >
                <RemoveRedEyeIcon className="relative"></RemoveRedEyeIcon>
                <div className=""></div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between items-end py-[10px]">
                <Link
                  href={"./ forgot"}
                  className="underline decoration-1 hover:text-[#0098FF] transition-colors duration-[0.5s]"
                >
                  Forgot your password?
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-[#0098FF]"
                >
                  Sign Up
                </Button>
              </div>
              <div className="flex relative items-center">
                <div className="w-full h-[1px] bg-[#000]"></div>
                <p className="absolute left-1/2 translate-x-[-50%] top-[-13px] px-[10px] bg-[#fff]">
                  or
                </p>
              </div>
            </div>
            <Link href="./signup" className="w-full">
              <Button
                variant="contained"
                color="primary"
                className="bg-[#0098FF] w-full"
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default Signin;
