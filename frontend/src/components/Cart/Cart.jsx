import { Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(()=>window.scrollTo(0, 0));

  return (
    <>
      <Flex
        id="items"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
        maxW="100vw"
        m="0 auto"
        py="4"
        minH={"80vh"}
        bg='white'
        color='black'
      >
        {
            cartItems.length === 0 ? <>
            <VStack h='80vh' spacing='10' justify={'center'}>
                <Heading>Cart is Empty!</Heading>
            <Button colorScheme={'messenger'} size='lg' variant='solid'><Link to='/products'>Shop here!</Link></Button>
            </VStack>
            </> :
        cartItems.map((item) => (
            <CartItem key={item.product} product={item} />
          ))
        }
      </Flex>
      <HStack bg='white' color='black' spacing={'10'} p='8' h='20vh' justify={'end'}>
            <Text fontSize='1.5rem'>Gross Total :</Text>
            <Text fontSize='1.5rem'>{`₹${cartItems.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            )}`}</Text>
            <Button variant={'solid'} colorScheme='messenger' onClick={checkoutHandler}>Check Out</Button>
        </HStack>
    </>
  );
};

export default Cart;
