import Rating from '@mui/material/Rating';
import React from "react";
import profilePng from "../images/Profile.png";
import {Box, Image, VStack, Text} from '@chakra-ui/react';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <VStack 
    flex={'none'}
    align={'center'} 
    m='1vmax' 
    p='3vmax' 
    w='22vmax'
    box-shadow='0 0 5px rgba(0, 0, 0, 0.226)'
    border='1px solid rgba(56, 56, 56, 0.116)'
    >
      <Image w='5vmax' src={profilePng} alt="User" />
      <Text color='rgba(0, 0, 0, 0.836)' font='600 0.9vmax "Roboto'>{review.name}</Text>
      <Rating {...options} />
      <Box color='rgba(0, 0, 0, 0.445)' font='300 0.8vmax cursive' >{review.comment}</Box>
    </VStack>
  );
};

export default ReviewCard;