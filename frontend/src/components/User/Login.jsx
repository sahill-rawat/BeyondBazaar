import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors } from '../../actions/productAction';
import {login} from '../../actions/userAction';
import Loader from '../Loader';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.search;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const redirect = location ? location.split("=")[1] : "/account";

  useEffect(()=>{
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
      toast.success('Logged In Successfully!');
    }

  },[isAuthenticated, error, dispatch, navigate, redirect]);

  return (
    (loading) ? <Loader/> : <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
    <form>
      <VStack
        alignItems={'stretch'}
        spacing={'8'}
        w={['full', '96']}
        m={'auto'}
        my={'16'}
      >
        <Heading>LogIn</Heading>

        <Input
          placeholder={'Email'}
          type={'email'}
          required
          focusBorderColor={'purple.500'}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Input
          placeholder={'Password'}
          type={'password'}
          required
          focusBorderColor={'purple.500'}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button variant={'link'} alignSelf={'flex-end'}>
          <Link to={'/forgetpassword'}>Forget Password?</Link>
        </Button>

        <Button colorScheme={'purple'} type={'submit'} onClick={loginSubmit} >
          Log In
        </Button>

        <Text textAlign={'right'}>
          New User?{' '}
          <Button variant={'link'} colorScheme={'purple'}>
            <Link to={'/signup'}>Sign Up</Link>
          </Button>
        </Text>
      </VStack>
    </form>
  </Container>
  );
};

export default Login;