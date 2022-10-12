import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChats } from '../redux/actions/chats.action';
import { useCustomToast } from '../hooks/showToast';
import { Box, Button, Stack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';

const MyChats = () => {
	const dispatch = useDispatch();

	const { customToast } = useCustomToast();

	const { loading, errors, data: chatData } = useSelector(
		(state) => state.chats
	);

	const [loggedUser, setLoggedUser] = useState();

	useEffect(() => {
		if (!isEmpty(errors.chats)) {
			customToast({
				title: 'Error occured!',
				description: 'Failed to load the chats',
				status: 'error',
				position: 'bottom-left',
			});
		}
	}, [errors]);

	useEffect(() => {
		dispatch(getChats());
	}, []);
	console.log('chatData.userChats', chatData);
	return (
		<Box
			display={{
				base: chatData.userChats.length > 0 ? 'none' : 'flex',
				md: 'flex',
			}}
			alignItems='center'
			flexDir='column'
			p={3}
			bg='white'
			w={{ base: '100%', md: '68%', lg: '50%' }}
			borderRadius='lg'
			borderWidth='1px'
		>
			<Box
				pb='3'
				px='3'
				fontSize={{ base: '28px', md: '30px' }}
				fontFamily='Work sans'
				display='flex'
				justifyContent='space-between'
				width='100%'
			>
				MyChats
				<Button
					display='flex'
					fontSize={{ base: '17px', md: '10px', lg: '17px' }}
					rightIcon={<AddIcon />}
				>
					New Group Chat
				</Button>
			</Box>
			<Box
				display='flex'
				flexDir='column'
				p={3}
				bg='#F8F8F8'
				w='100%'
				h='100%'
				borderRadius='lg'
				overflowY='hidden'
			>
				{chatData.chats ? <Stack></Stack> : <ChatLoading />}
			</Box>
		</Box>
	);
};

export default MyChats;
