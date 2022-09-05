import React from 'react';
import {
	Container,
	Box,
	Text,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	return (
		<Container maxW='xl'>
			<Box
				display='flex'
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
			<Box w='100%' p={4} bg='white' borderRadius='lg' borderWidth='1px'>
				<Tabs variant='soft-rounded' w='100%'>
					<TabList>
						<Tab width='50%'>Login</Tab>
						<Tab width='50%'>SignUp</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<SignUp />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default HomePage;
