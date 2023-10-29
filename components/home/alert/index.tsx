"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  setOpen,
  open,
  findDay
}: {
  setOpen: any;
  open: boolean;
  findDay : any
}) {
  const [time, setTime] = React.useState<any>(() => {
    const time = new Date();
    return time.getTime();
  });
  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Search</DialogTitle>
        <DialogContent className="flex gap-[10px] overscroll-none">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(event: any) => {
                  // const { value } = event.target as HTMLInputElement;
                  setTime(event.$d.getTime());
                }}
                label="Basic date picker"
                value={dayjs(time)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button
            onClick={async () => {
              await findDay(Number((time / 1000).toFixed(0)))
              handleClose();
            }}
          >
            Find
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
