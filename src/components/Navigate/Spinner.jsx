import React from "react";
import { CircularProgress, Box, Fade } from "@mui/material";
import MenungguIcon from "../../assets/icons/menunggu.png";

export default function Spinner() {
  // spinner loading
  const CircularLoading = () => {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress size={25} />
      </Box>
    );
  };
  // const loading spinner
  const LoadingSpinner = () => {
    return (
      <Fade in={true} timeout={500}>
        <div className="flex flex-row items-center justify-center gap-2">
          <CircularLoading />
          <h2 className="font-poppins text-md font-semibold ">
            Tunggu, data akan segera siap{" "}
          </h2>
          <img
            src={MenungguIcon}
            alt="loading"
            className="animate-bounce w-[2rem] h-[2rem]  rounded-lg"
          />
        </div>
      </Fade>
    );
  };
  return (
    <>
      <LoadingSpinner />
    </>
  );
}
