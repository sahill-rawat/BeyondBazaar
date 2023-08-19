import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Heading,
    Stack,
    Text,
    Divider,
    Button,
    HStack,
    Input
  } from "@chakra-ui/react";
import {AiFillDelete} from 'react-icons/ai';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';
  

const CartItem = ({product}) => {

  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
    return (
        <Card maxW="xs" m='1rem' >
          <CardBody justifyContent={'center'}>
            <Image h='25vh' w='100%' objectFit={'cover'} src={product.image} alt={product.name} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.name}</Heading>
              <Text color="blue.600" fontSize="2xl">
              ₹{product.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <HStack w='100%'>
              <Button  w='20%' variant="solid" colorScheme="blue" onClick={() =>
                        increaseQuantity(
                          product.product,
                          product.quantity,
                          product.stock
                        )
                      }>
                +
              </Button>
              <Input w='60%' type="number" value={product.quantity} textAlign='center' readOnly/>
              <Button w='20%' variant="solid" colorScheme="blue" onClick={() =>
                        decreaseQuantity(product.product, product.quantity)
                      }>
                -
              </Button>
              <Button onClick={() => deleteCartItems(product.product)}><AiFillDelete size={'50'} /></Button>
            </HStack>
          </CardFooter>
        </Card>
      );
}

export default CartItem