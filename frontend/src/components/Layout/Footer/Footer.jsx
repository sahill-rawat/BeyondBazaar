import React from "react";
import {
  VStack,
  Stack,
  Image,
  Link,
  Heading,
  Text
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import play from "../../../images/playstore.png";
import apps from "../../../images/Appstore.png";

const Footer = () => {
  return (
    <>
      <Stack direction={{ base: "column", md: "row" }} w='100vw' alignItems={'center'} textAlign='center' p='2rem 4rem' justifyContent={'space-around'} bgColor={'blackAlpha.900'} minH={'30'} color={'white'}>
        <VStack w={'20%'}>
          <Heading size={'md'} >Download our app</Heading>
          <Image maxH={'40px'} src={play} />
          <Image maxH={'40px'} src={apps} />
        </VStack>
        <VStack w={'30%'}>
          <Heading size={"2xl"}>BeyondBazaar</Heading>
          <Text>Naye India ka Bazaar.</Text>
          <Text>Copyrights 2023 &copy; sahill_rawat</Text>
        </VStack>
        <VStack w={'20%'}>
          <Heading size={'md'}  >Follow us</Heading>
          <Link href="https://www.instagram.com/sahill_rawat/">
            Instagram 
            <ExternalLinkIcon mx="2px" />
          </Link>
          <Link href="https://www.linkedin.com/in/sahill-rawat/">
            Linkedin 
            <ExternalLinkIcon mx="2px" />
          </Link>
          <Link href="https://github.com/sahill-rawat">
            Github 
            <ExternalLinkIcon mx="2px" />
          </Link>
        </VStack>
      </Stack>
    </>
  );
};

export default Footer;
