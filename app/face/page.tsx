"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@/assets/images/face/delete.svg";
import EditIcon from "@/assets/images/face/edit.svg";
import Card from "@/components/home/card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import arrow_right from "@/assets/images/face/arrow_right.svg";
import arrow_left from "@/assets/images/face/arrow_left.svg";
import Image from "next/image";
import ButtonArrow from "@/components/face/button_arrow";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Face = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isScrollEnd, setScrollEnd] = useState<Array<boolean>>([]);
  const [transformScrollEvent, setTransformScrollEvent] = useState<
    Array<number>
  >(Array(5).fill(0));
  const [data, setData] = useState([
    {
      id: "1",
      name: "",
      payload: {
        url: "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/398196250_819992589920906_2345198132184999586_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RKQwJbaFytgAX8VojWl&_nc_oc=AQmKn7assqDqEWr5tipLVaVDShIYMuPB3RZjCSaywWOsTLOPdbj9RLFZtD4YNC0uQM0&_nc_ht=scontent.fdad1-4.fna&oh=00_AfC6qmZ7rewEtKaoWTyVUalx3NBE5nnggWl5zKGdelu8tQ&oe=654E5A75",
        image_url: ["", "", "", "", "", "", ""],
        image_uuid: ["1", "2", "3"],
      },
    },
    {
      id: "2",
      name: "",
      payload: {
        url: "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/398196250_819992589920906_2345198132184999586_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RKQwJbaFytgAX8VojWl&_nc_oc=AQmKn7assqDqEWr5tipLVaVDShIYMuPB3RZjCSaywWOsTLOPdbj9RLFZtD4YNC0uQM0&_nc_ht=scontent.fdad1-4.fna&oh=00_AfC6qmZ7rewEtKaoWTyVUalx3NBE5nnggWl5zKGdelu8tQ&oe=654E5A75",
        image_url: ["", "", "", ""],
        image_uuid: ["1", "2", "3"],
      },
    },
    {
      id: "3",
      name: "",
      payload: {
        url: "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/398196250_819992589920906_2345198132184999586_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RKQwJbaFytgAX8VojWl&_nc_oc=AQmKn7assqDqEWr5tipLVaVDShIYMuPB3RZjCSaywWOsTLOPdbj9RLFZtD4YNC0uQM0&_nc_ht=scontent.fdad1-4.fna&oh=00_AfC6qmZ7rewEtKaoWTyVUalx3NBE5nnggWl5zKGdelu8tQ&oe=654E5A75",
        image_url: ["", "", "", "", "", "", ""],
        image_uuid: ["1", "2", "3"],
      },
    },
    {
      id: "4",
      name: "",
      payload: {
        url: "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/398196250_819992589920906_2345198132184999586_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RKQwJbaFytgAX8VojWl&_nc_oc=AQmKn7assqDqEWr5tipLVaVDShIYMuPB3RZjCSaywWOsTLOPdbj9RLFZtD4YNC0uQM0&_nc_ht=scontent.fdad1-4.fna&oh=00_AfC6qmZ7rewEtKaoWTyVUalx3NBE5nnggWl5zKGdelu8tQ&oe=654E5A75",
        image_url: ["", "", "", ""],
        image_uuid: ["1", "2", "3"],
      },
    },
    {
      id: "5",
      name: "",
      payload: {
        url: "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/398196250_819992589920906_2345198132184999586_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RKQwJbaFytgAX8VojWl&_nc_oc=AQmKn7assqDqEWr5tipLVaVDShIYMuPB3RZjCSaywWOsTLOPdbj9RLFZtD4YNC0uQM0&_nc_ht=scontent.fdad1-4.fna&oh=00_AfC6qmZ7rewEtKaoWTyVUalx3NBE5nnggWl5zKGdelu8tQ&oe=654E5A75",
        image_url: ["", "", "", ""],
        image_uuid: ["1", "2", "3"],
      },
    },
  ]);
  const [reName, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [uuidOfRename, setUuidOfRename] = useState<string>("");
  const getFace = async () => {
    try {
      await axios
        .get(`https://glimpse.serveo.net/get_face_data`, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then(async (res) => {
          setLoading(true);
          if (typeof window != "undefined")
            localStorage.setItem("face", JSON.stringify(res.data.points));
          setData(res.data.points);
          setTransformScrollEvent(Array(res.data.points?.length).fill(0));
          setScrollEnd(Array(res.data.points?.length).fill(false));
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditName = (uuid: string) => {
    setOpen(true);
    setUuidOfRename(uuid);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const upadateName = () => {
    try {
      axios.get(
        `https://glimpse.serveo.net/update_name/${uuidOfRename}/${reName}`
      );
      setOpen(false);
      const arr: any = data?.map((element: any) => {
        if (element.id === uuidOfRename) element.name = reName;
      });
      setData(arr);
    } catch (err) {
      console.log("first", err);
    }
  };
  const deleteName = () => {
    try {
      axios.get(`https://glimpse.serveo.net/delete_name/${uuidOfRename}`);
      setOpen(false);
      const arr: any = data?.map((element: any) => {
        if (element.id === uuidOfRename) element.name = "";
      });
      setData(arr);
    } catch (err) {
      console.log("first", err);
    }
  };
  const handleTransformScroll = (
    id: string,
    index: number,
    transform: number
  ) => {
    const ulElement = document.getElementById(id);
    ulElement?.scroll({
      left: transform,
      behavior: "smooth",
    });
    setTransformScrollEvent(
      transformScrollEvent.toSpliced(index, 1, transform)
    );
  };
  const handleScroll = (e: React.UIEvent<HTMLUListElement>, index: number) => {
    const element = e.target as HTMLUListElement;
    if (element?.scrollLeft + element?.clientWidth >= element?.scrollWidth) {
      setScrollEnd(isScrollEnd.toSpliced(index, 1, true));
    } else if (isScrollEnd[index]) {
      setScrollEnd(isScrollEnd.toSpliced(index, 1, false));
    }
  };
  useEffect(() => {
    getFace();
  }, []);
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent>
          <div className=" flex py-[20px] gap-[10px] justify-between overscroll-none">
            <TextField
              variant="outlined"
              label="Name"
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                setName(target.value);
              }}
            ></TextField>
            <Button
              onClick={deleteName}
              variant="contained"
              className="flex items-center justify-center"
            >
              <Image src={DeleteIcon} alt="delete icon"></Image>
            </Button>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-between w-full">
          <Button onClick={handleClose}>Cancle</Button>
          <div className="flex gap-[10px]">
            <Button onClick={upadateName} variant="contained">
              Accept
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <div className="w-full">
        {data?.map((face: any, index: number) => (
          <div
            key={face.id}
            className="flex flex-col justify-start  md:gap-[10px] sm:gap-[8px]  py-[10px] overflow-x-hidden"
          >
            <div className=" ">
              <div className="top-0 left-0 flex gap-[20px] justify-start items-center">
                <h2>{face.name || "Name"}</h2>
                <button
                  onClick={() => {
                    handleEditName(face.id);
                  }}
                  className="flex items-center justify-center"
                >
                  <Image src={EditIcon} alt="edit icon text-[#202020]"></Image>
                </button>
              </div>
            </div>
            <div className="flex overflow-x-hidden w-full items-center">
              <picture className="w-full xl:min-w-[170px] lg:min-w-[calc((100%-40px)/5)] md:min-w-[calc((100%-30px)/4)] ssm:min-w-[calc((100%-24px)/4)] sm:min-w-[calc((100%-16px)/3)] block rounded-full overflow-hidden aspect-[1/1] xl:w-[170px] lg:w-[calc((100%-40px)/5)] md:w-[calc((100%-30px)/4)] ssm:w-[calc((100%-24px)/4)] sm:w-[calc((100%-16px)/3)]">
                {isLoading ? (
                  <LazyLoadImage
                    key={face.id}
                    src={`${face.payload.url}?tr=w-500,h-500`}
                    className="w-full h-full"
                  ></LazyLoadImage>
                ) : (
                  <Skeleton
                    width={250}
                    height={250}
                    variant="rounded"
                    className="w-full h-full"
                  />
                )}
              </picture>
              <div className="w-full relative overflow-hidden ">
                <ButtonArrow
                  onClick={() =>
                    handleTransformScroll(
                      face.id,
                      index,
                      transformScrollEvent[index] - 100
                    )
                  }
                  icon={arrow_left}
                  disable={transformScrollEvent[index] === 0 ? true : false}
                  left
                />
                <ButtonArrow
                  onClick={() =>
                    handleTransformScroll(
                      face.id,
                      index,
                      transformScrollEvent[index] + 100
                    )
                  }
                  icon={arrow_right}
                  right
                  disable={isScrollEnd[index] ? true : false}
                />

                <ul
                  id={face.id}
                  onScroll={(e: React.UIEvent<HTMLUListElement>) =>
                    handleScroll(e, index)
                  }
                  //
                  className={`touch-auto scroll-none overflow-x-scroll snap-x  ease-in flex relative justify-start md:gap-[10px] w-full sm:gap-[8px]  p-[10px] `}
                >
                  {face?.payload?.image_url?.map(
                    (imageFace: any, index: number) => (
                      <Card
                        key={face?.payload?.image_uuid[index]}
                        isLoading={isLoading}
                        id={face?.payload?.image_uuid[index]}
                        url={`${imageFace}?tr=w-150,h-150`}
                        filetype={"image"}
                        hiddenType
                      ></Card>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Face;
