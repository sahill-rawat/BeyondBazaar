import React, { useEffect } from "react";
import { VStack, Heading, Text, Box, Button, Flex } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { clearErrors, getProducts } from "../../actions/productAction";

import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import Loader from "../Loader";
import MetaData from "../Layout/MetaData";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state)=>state.products)
  useEffect(()=> {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch,error]);

  function scrollByHeight() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    (loading) ?  (<Loader/>) : (
      <>
      <MetaData title='BeyondBazaar'/>
      <Box>
        <VStack
          align="center"
          justify="center"
          h="100vh"
          w="100%"
        >
          <Heading fontSize={"6vmax"}> BeyondBazaar </Heading>
          <Text fontSize={"2vmax"}>Naye India ka Bazaar</Text>
          <Button mt="1rem" variant={"outline"} onClick={scrollByHeight}>
            Scroll
          </Button>
        </VStack>
        <Box
          as="div"
          content=""
          w="100%"
          h="100vh"
          bg="white"
          position="absolute"
          top="0%"
          left="0"
          clipPath="polygon(100% 48%, 0% 100%, 100% 100%)"
          zIndex="-1"
        />
      </Box>
      <Flex
        id="items"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
        maxW="90vw"
        m="0 auto"
        py="4"
        minH={'100vh'}
      >
        {products &&
          products.map((product) => <ProductCard key={product._id} product={product} />)}
      </Flex>
    </>
    )
  );
};

export default Home;
