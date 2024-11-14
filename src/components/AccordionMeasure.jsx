import React from  'react';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";



export function AccordionMeasure({headingMeasure, descriptionMeasure }) {
    return(
        <div className='font-poppins rounded-full'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='text-md font-semibold'
                >
                    {headingMeasure}
                </AccordionSummary>
                <AccordionDetails className='text-sm font-normal text-justify'>
                    {descriptionMeasure}
                </AccordionDetails>
            </Accordion>
        </div>

    )

}