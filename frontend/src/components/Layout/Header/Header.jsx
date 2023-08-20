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
import store from "../../../store";
import { loadUser, logout } from "../../../actions/userAction";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    if (isAuthenticated) store.dispatch(logout());
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
              <Link to={"/"}>
                <Button
                  as="button"
                  onClick={onClose}
                  variant={"ghost"}
                  colorScheme="purple"
                >
                  Home
                </Button>
              </Link>
              <Link to={"/products"}>
                <Button
                  onClick={onClose}
                  variant={"ghost"}
                  colorScheme="purple"
                >
                  Products
                </Button>
              </Link>
              <Link to={"/search"}>
                <Button
                  onClick={onClose}
                  variant={"ghost"}
                  colorScheme="purple"
                >
                  Search
                </Button>
              </Link>
            </VStack>

            {isAuthenticated ? (
              <HStack
                pos={"absolute"}
                bottom="10"
                left="0"
                width={"full"}
                justifyContent="space-evenly"
              >
                <Link to={"/logout"}>
                <Button
                  onClick={() => {
                    onClose();
                    handleLogout();
                    navigate("/");
                    toast.success("LoggedOut Successfully!");
                  }}
                  colorScheme="purple"
                >
                  Logout
                </Button>
                </Link>

                <Link to={"/account"}>
                <Button
                  onClick={onClose}
                  colorScheme="purple"
                  variant={"outline"}
                >
                  My Profile
                </Button>
                </Link>

                <Link to={"/cart"}>
                <Button
                  onClick={onClose}
                  colorScheme="purple"
                  variant={"outline"}
                >
                  Cart
                </Button>
                </Link>
              </HStack>
            ) : (
              <HStack
                pos={"absolute"}
                bottom="10"
                left="0"
                width={"full"}
                justifyContent="space-evenly"
              >
                <Link to={"/login"}>
                  <Button onClick={onClose} colorScheme="purple">
                    Login
                  </Button>
                </Link>

                <Link to={"/signup"}>
                  <Button
                    onClick={onClose}
                    colorScheme="purple"
                    variant={"outline"}
                  >
                    SignUp
                  </Button>
                </Link>
              </HStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
