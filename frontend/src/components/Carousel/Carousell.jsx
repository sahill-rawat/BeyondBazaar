import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, HStack, Image } from "@chakra-ui/react";

const Carousell = (props) => {
  const data = props.data;
  return (
    <HStack h="100%" w="100%">
      <Carousel
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={2000}
        infiniteLoop={true}
        autoPlay={true}
        width="100%"
      >
        {data.map((i) => (
          <Box h={{base:'40vh', md:'100vh'}} key={i._id}>
            <Image
              width="100%"
              h="100%"
              objectFit={"contain"}
              src={i.url}
              alt={"img"}
            />
          </Box>
        ))}
      </Carousel>
    </HStack>
  );
};

export default Carousell;
