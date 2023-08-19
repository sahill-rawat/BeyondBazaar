import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import store from '../../../store'; 
import { loadUser, logout } from "../../../actions/userAction";
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state)=>state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    if (isAuthenticated)  store.dispatch(logout());
  }


  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <>
      <Button
        p="0"
        w="10"
        h="10"
        borderRadius={"full"}
        position={"fixed"}
        top={4}
        left={4}
        colorScheme="purple"
        onClick={onOpen}
        zIndex="100"
      >
        <BiMenuAltLeft size={"20"} />
      </Button>

      <Drawer zIndex="1000" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>BeyondBazaar</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button onClick={onClose} variant={"ghost"} colorScheme="purple">
                <Link to={"/"}>Home</Link>
              </Button>
              <Button onClick={onClose} variant={"ghost"} colorScheme="purple">
                <Link to={"/products"}>Products</Link>
              </Button>
              <Button onClick={onClose} variant={"ghost"} colorScheme="purple">
                <Link to={"/search"}>Search</Link>
              </Button>
            </VStack>

            {isAuthenticated ? (
              <HStack
                pos={"absolute"}
                bottom="10"
                left="0"
                width={"full"}
                justifyContent="space-evenly"
              >
                <Button onClick={()=> {onClose(); handleLogout(); navigate('/'); toast.success('LoggedOut Successfully!') }} colorScheme="purple">
                  <Link to={"/logout"}>Logout</Link>
                </Button>

                <Button
                  onClick={onClose}
                  colorScheme="purple"
                  variant={"outline"}
                >
                  <Link to={"/account"}>My Profile</Link>
                </Button>

                <Button
                  onClick={onClose}
                  colorScheme="purple"
                  variant={"outline"}
                >
                  <Link to={"/cart"}>Cart</Link>
                </Button>
              </HStack>
            ) : (
              <HStack
                pos={"absolute"}
                bottom="10"
                left="0"
                width={"full"}
                justifyContent="space-evenly"
              >
                <Button onClick={onClose} colorScheme="purple">
                  <Link to={"/login"}>Login</Link>
                </Button>

                <Button
                  onClick={onClose}
                  colorScheme="purple"
                  variant={"outline"}
                >
                  <Link to={"/signup"}>SignUp</Link>
                </Button>
              </HStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
