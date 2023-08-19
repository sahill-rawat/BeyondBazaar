import {
  Avatar,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../actions/userAction";
import Loader from "../Loader";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
      toast.success('Signed Up In Successfully!');
    }
  }, [loading, error, dispatch, navigate, isAuthenticated]);

  return loading ? (
    <Loader />
  ) : (
    <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
      <form>
        <VStack
          alignItems={"stretch"}
          spacing={"8"}
          w={["full", "96"]}
          m={"auto"}
        >
          <Heading alignSelf={"center"}>BeyondBazaar</Heading>
          <Avatar alignSelf={"center"} boxSize={"32"} />

          <VStack>
            <Input
              placeholder={"Name"}
              type={"text"}
              required
              focusBorderColor={"purple.500"}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder={"Email"}
              type={"email"}
              required
              focusBorderColor={"purple.500"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder={"Password"}
              type={"password"}
              required
              focusBorderColor={"purple.500"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              colorScheme={"purple"}
              type={"submit"}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </VStack>

          <Text textAlign={"right"}>
            Already Signed Up?{" "}
            <Button variant={"link"} colorScheme={"purple"}>
              <Link to={"/login"}>Log In</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
