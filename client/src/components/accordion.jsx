import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import accordionData from "../assets/data/welcomeAccordion";

const AccordionComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    console.log(e)
    // setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
    {accordionData.map((accord) => {
      return (
        <Accordion
        key={accord.id}

      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${accord.id}-content`} id={`panel${accord.id}-header`}>
          <Typography>{accord.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{accord.text}</Typography>
        </AccordionDetails>
      </Accordion>
      )
    })}

      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
          <Typography>Default transition using Collapse</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </>
  );
};

export default AccordionComponent;

// <ChakraProvider>
//   <Accordion>
//     {data.map((d) => (
//       <AccordionItem key={d.id}>
//         <h2>
//           <AccordionButton>
//             <Box as="span" flex="1" textAlign="left">
//               {d.name}
//             </Box>
//             <AccordionIcon />
//           </AccordionButton>
//         </h2>
//         <AccordionPanel pb={4}>{d.text}</AccordionPanel>
//       </AccordionItem>
//     ))}
//   </Accordion>
// </ChakraProvider>
