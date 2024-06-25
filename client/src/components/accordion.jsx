import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, ChakraProvider } from "@chakra-ui/react";

const AccordionComponent = ({ data }) => {


  return (
    <ChakraProvider>
      <Accordion>
        {data.map((d) => (
          <AccordionItem key={d.id}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {d.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{d.text}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </ChakraProvider>
  );
};

export default AccordionComponent;
