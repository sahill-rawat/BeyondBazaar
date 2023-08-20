import { Button, Input, HStack, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "./Layout/MetaData";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search" />
      <VStack h="100vh" align="center" justify="center">
        <Heading mb='5'>Search Products</Heading>
        <HStack justify={"center"}>
          <Input
            border="2px"
            w="70%"
            placeholder="Enter Product..."
            size="md"
            type={"text"}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button border="2px" variant={"outline"} onClick={handleSubmit}>
            Search
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default Search;
