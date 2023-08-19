import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import {
  InputGroup,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputLeftElement,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Country, State } from "country-state-city";
import { FaMapMarkerAlt, FaCity, FaMapPin, FaPhone } from "react-icons/fa";
import { useEffect } from "react";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [selectedState, setSelectedState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state: selectedState,
        country,
        pinCode,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };
  useEffect(()=>window.scroll(0,0));

  return (
    <VStack justify='center' minH='100vh'>
      <Heading>Shipping Info</Heading>
      <form onSubmit={shippingSubmit}>
        
        <FormControl mt={4}>
          <FormLabel>Country</FormLabel>
          <Select value={country} onChange={(e) => setCountry(e.target.value)}>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>State</FormLabel>
          <Select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {State &&
              State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Address</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaMapMarkerAlt color="gray.300" />}
            />
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>City</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaCity color="gray.300" />}
            />
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Pin Code</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaMapPin color="gray.300" />}
            />
            <Input value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaPhone color="gray.300" />}
            />
            <Input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
          </InputGroup>
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          Continue
        </Button>
      </form>
    </VStack>
  );
};

export default Shipping;
