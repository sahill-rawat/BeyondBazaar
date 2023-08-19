import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {FcCheckmark} from 'react-icons/fc';

const Success = () => {

  return (
    <VStack bg={'white'} color={'black'} spacing={'10'} p='20vh 0 0 0' h='100vh'>
        <Box> <FcCheckmark size={'150'} /> </Box>
        <Heading> Your order has been placed successfully! </Heading>
        <Button variant='solid' colorScheme='whatsapp'> <Link to={'/products'} >Continue Shopping</Link> </Button>
    </VStack>
  )
}

export default Success