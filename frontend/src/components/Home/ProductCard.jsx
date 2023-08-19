import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
  Divider,
  // Button,
  // ButtonGroup,
  Link
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const description = (desc) => {
    let string = "";
    for (let i = 0; i < desc.length; i++) {
      if (desc[i] !== "&") string+=desc[i];
    }
    return string;
  };
  
  return (
    <Link as={RouterLink} style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
    <Card maxW="xs" m='1rem' minH={'70vh'} >
      <CardBody justifyContent={'center'}>
        <Image h='25vh' w='100%' objectFit={'cover'} src={product.images[0].url} alt={product.name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.name}</Heading>
          <Text>{description(product.description)}</Text>
          <Text color="blue.600" fontSize="2xl">
          ₹{product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {/* <ButtonGroup spacing="2">
            <Link href={`/product/${product._id}`}>
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          </Link>
          <Link href={`/product/${product._id}`}>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
          </Link>
        </ButtonGroup> */}
      </CardFooter>
    </Card>
    </Link>
  );
};

export default ProductCard;
