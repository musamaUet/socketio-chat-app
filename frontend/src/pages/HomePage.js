import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';

const HomePage = () => {
	return (
		<Container maxW='xl'>
			<Box
				d='flex'
				justifyContent='center'
				w='100%'
				p={3}
				bg='white'
				m='40px 0 15px 0'
				borderRadius='lg'
				borderWidth='1px'
			>
				<Text fontSize='4xl' color='black' fontFamily='Work sans'>
					Talk A Tive
				</Text>
			</Box>
			<Box w='100%' p={4} bg='white' borderRadius='lg' borderWidth='1px'></Box>
		</Container>
	);
};

export default HomePage;
