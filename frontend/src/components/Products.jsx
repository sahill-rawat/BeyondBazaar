import {
  Heading,
  Flex,
  HStack,
  Button,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Tooltip,
  SliderThumb,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../actions/productAction";
import ProductCard from "./Home/ProductCard";
import MetaData from "./Layout/MetaData";
import Loader from "./Loader";

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = React.useState(100000);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [rating, setRating] = useState(4);
  const { products, loading, error, productCount, productPerPage } =
    useSelector((state) => state.products);

  const totalPages = parseInt(productCount / productPerPage);
  let count = products.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, rating));
  }, [dispatch, keyword, currentPage, error, price, rating]);

  const propsForSlider = {
    m: "4vmax",
    w: "40vw",
    id: "slider",
    min: 0,
    colorScheme: "teal",
    onMouseEnter: () => setShowTooltip(true),
  };

  const tooltipProps = {
    hasArrow: true,
    bg: "teal.500",
    color: "white",
    placement: "top",
    isOpen: showTooltip,
    zIndex: "100000",
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={"Products"} />
      <VStack minH="98vh">
        <Heading mt='1vh'>Products</Heading>
        <HStack>
          <Slider
            defaultValue="200000"
            max="500000"
            onChange={(v) => setPrice(v)}
            {...propsForSlider}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip {...tooltipProps} label={`Price upto ${price}`}>
              <SliderThumb />
            </Tooltip>
          </Slider>

          <Slider
            defaultValue="4"
            max="5"
            onChange={(v) => setRating(v)}
            {...propsForSlider}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip {...tooltipProps} label={`Rating:${rating}`}>
              <SliderThumb />
            </Tooltip>
          </Slider>
        </HStack>

        <Flex
          w="90%"
          id="items"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto"
          py="4"
        >
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </Flex>

        {productPerPage < count && (
          <HStack justify={"center"}>
            <Button onClick={() => setCurrentPage(1)}>1st</Button>
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              Prev
            </Button>
            <Button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              Next
            </Button>
            <Button
              onClick={() => {
                setCurrentPage(
                  productCount % productPerPage === 0
                    ? totalPages
                    : totalPages + 1
                );
              }}
            >
              Last
            </Button>
          </HStack>
        )}
      </VStack>
    </>
  );
};

export default Products;
