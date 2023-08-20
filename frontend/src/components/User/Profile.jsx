import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import { HStack, Button, VStack, Image, Heading } from "@chakra-ui/react";
import profilePng from "../../images/Profile.png";
import MetaData from "../Layout/MetaData";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getFirstName = (name) => {
    let firstName = "";
    for (let i = 0; i < name.length; i++) {
      if (name[i] === " ") return firstName;
      firstName += name[i];
    }
    return firstName;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        
        <VStack
          flex={"none"}
          align={"center"}
          justify="center"
          w="100vw"
          h="100vh"
          color="black"
          bg={"white"}
        >
          <MetaData title='My Account'/>
          <Image w="25vh" src={profilePng} alt="User" />
          <VStack
            mb="3vh"
            minH="15vh"
            justify={"space-between"}
            textAlign={"left"}
          >
            <Heading fontSize={"4vh"}>{`Hii, ${getFirstName(
              user.name.trim()
            )}`}</Heading>
            <Heading fontSize={"3vh"}>{`${user.email}`}</Heading>
          </VStack>
          <HStack>
            {/* <Button variant={"solid"} colorScheme="red" to="/orders">
              My Orders
            </Button> */}
            <Button variant={"solid"} colorScheme="red">
              <Link to='/password/update'>Change Password</Link>
            </Button>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default Profile;
