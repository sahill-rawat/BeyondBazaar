import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Image,
} from '@chakra-ui/react';

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    navigate('/process/payment');
  };

  return (
    <VStack minH='100vh' w='100vw' justify='flex-start'>
      <Heading mt='7vh' mb='3vh' fontSize={'1.7rem'}>Confirm Your Order</Heading>
      <VStack  h='80vh' align={'baseline'} justify='space-evenly'>
      <Box>
        <Heading size="md" mb={2}>
          Shipping Information:
        </Heading>
        <Text>{address}</Text>
      </Box>
      <Box>
        <Heading size="md" mb={2}>
          Cart Items:
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          {cartItems.map((item) => (
            <Box key={item.product} p={2} borderWidth="1px" rounded="md">
                <Image h='25vh' w='100%' objectFit={'cover'} src={item.image} alt={item.name} borderRadius="lg" />
              <Text>{item.name}</Text>
              <Text>Price: ₹{item.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading size="md" mb={2}>
          Total Price:
        </Heading>
        <Text>Subtotal: ₹{subtotal.toFixed(2)}</Text>
        <Text>Shipping Charges: ₹{shippingCharges.toFixed(2)}</Text>
        <Text>Tax: ₹{tax.toFixed(2)}</Text>
        <Text fontWeight="bold">Total: ₹{totalPrice.toFixed(2)}</Text>
      </Box>
      <Button colorScheme="blue" onClick={proceedToPayment}>
        Proceed to Payment
      </Button>
      </VStack>
    </VStack>
  );
};

export default ConfirmOrder;
