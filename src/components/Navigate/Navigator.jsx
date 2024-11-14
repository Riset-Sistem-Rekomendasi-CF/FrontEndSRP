import React from "react";
import HeaderNavigate from "./HeaderNavigate";
import ChipNavigate from "./ChipNavigate";
import { useMediaQuery } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';

const Navigator = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <HeaderNavigate>
            <ChipNavigate
                href={"/"}
                color={"bg-greenDrak-btn-primary text-white"}
                className={isMobile ? "rounded-full p-4" : ""}
            >
                {isMobile ? <HomeIcon /> : "Homepage"}
            </ChipNavigate>

            <ChipNavigate
                href={"/tutorial"}
                color={"bg-card_green_primary text-white"}
                className={isMobile ? "rounded-full p-4" : ""}
            >
                {isMobile ? <BookIcon /> : "Tutorial"}
            </ChipNavigate>

            <ChipNavigate
                href={"/practice"}
                color={"bg-yellow-btn-primary text-white"}
                className={isMobile ? "rounded-full p-4" : ""}
            >
                {isMobile ? <EditIcon /> : "Practice"}
            </ChipNavigate>
        </HeaderNavigate>
    );
};

export default Navigator;
