import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../actions/productAction";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Link,
  Box,
  Stack,
  Input,
} from "@chakra-ui/react";
import Carousell from "./Carousel/Carousell";
import { toast } from "react-hot-toast";
import MetaData from "./Layout/MetaData";
import { addItemsToCart } from "../actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state)=> state.user);
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const incQuantity = ()=>  setQuantity((Math.min(quantity+1, product.Stock))); 
  const decQuantity = ()=>  setQuantity(Math.max(quantity-1, 1));
 
  const addToCartHandler = () => {
    if (isAuthenticated === false)  {
      navigate('/login');
    }
    else {
      dispatch(addItemsToCart(id, quantity));
      toast.success("Item Added To Cart");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, loading]);

  const description = (desc) => {
    const all = [];
    let string = "";
    for (let i = 0; i < desc.length; i++) {
      if (desc[i] === "&") {
        all.push(string);
        string = "";
      } else string += desc[i];
    }
    if (string.length) all.push(string);
    return all;
  };

  return loading || !product ? (
    <Loader />
  ) : (
    <>
      <MetaData title={product.name} />
      <Stack
        rowGap={"0"}
        columnGap="0"
        direction={{ base: "column", md: "row" }}
        h="100vh"
      >
        <HStack h={{ base: "40%", md: "100%" }} w={{ base: "100%", md: "65%" }}>
          <Carousell data={product.images} />
        </HStack>
        <VStack
          p="5vmax"
          align={{ base: "center", md: "flex-start" }}
          textAlign={{ base: "center", md: "flex-start" }}
          w={{ base: "100%", md: "35%" }}
          h={{ base: "60%", md: "100%" }}
          // bg={"whiteAlpha.900"}
          // color="black"
        >
          <Heading fontSize={"large"}> {product.name} </Heading>
          <HStack>
            <Box
              color="white"
              textAlign={"center"}
              borderRadius={"3px"}
              p="min(0.5vmax, (4px))"
              bg="green"
            >{`${product.ratings}☆`}</Box>
            <Text> {`${product.numOfReviews} Reviews`} </Text>
            <Text
              color="white"
              textAlign={"center"}
              borderRadius={"3px"}
              p="min(0.5vmax, (4px))"
              bg={product.Stock < 1 ? "red" : "green"}
            >
              {product.Stock < 1 ? "Out of Stock" : "In Stock"}
            </Text>
          </HStack>
          <Text fontWeight={"bold"}> {`₹${product.price}`} </Text>
          {description(product.description).map((str) => (
            <Text key={str}>{str}</Text>
          ))}
          <HStack justify={{ base: "space-around" }} w="20vw">
            <Button variant="outline" colorScheme="blue" onClick={decQuantity}>
              -
            </Button>
            <Input
              minW={"10vw"}
              textAlign={"center"}
              value={quantity}
              type="number"
              readOnly
            ></Input>
            <Button variant="outline" colorScheme="blue"  onClick={incQuantity}>
              +
            </Button>
          </HStack>
          <HStack w="20vw" justify={{ base: "space-around", md: "flex-start" }}>
            <Link>
              <Button variant="solid" colorScheme="blue" disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>
                Add to cart
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Stack>

      {/* <Heading textAlign={"center"} m="1vh">
        Reviews
      </Heading>
      <Stack
        bg="whiteAlpha.900"
        rowGap={"0"}
        columnGap="0"
        direction={{ base: "column", md: "row" }}
        color="black"
        p={"2rem"}
        overflow="auto"
      >
        {product.reviews && product.reviews[0] ? (
          <Stack
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "flex-start" }}
          >
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </Stack>
        ) : (
          <Text
            font='400 1.3vmax "Gill Sans'
            textAlign="center"
            color="rgba(0, 0, 0, 0.548)"
          >
            No Reviews Yet
          </Text>
        )}
      </Stack> */}
    </>
  );
};

export default ProductDetails;
