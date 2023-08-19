import { Button, Input, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from './Layout/MetaData';

const Search = ({history}) => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e)=> {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }
        else {
            navigate('/products');
        }
    }

  return ( 
    <>
    <MetaData title='Search' />
    <HStack h='100vh' justify={'center'}>
         <Input w='50%' placeholder='' size='md'  type={'text'} onChange={(e)=> setKeyword(e.target.value)} />
         <Button variant={'outline'} onClick={handleSubmit} >Search</Button>
    </HStack>
    </>
  )
}

export default Search;
