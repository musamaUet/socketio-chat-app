import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChats } from '../../redux/actions/chats.action';
import { Box } from '@chakra-ui/react';
import { useCustomToast } from '../hooks';

const ChatBox = () => {
	const dispatch = useDispatch();
	const customToast = useCustomToast();
	const { loading, errors, data } = useSelector((state) => state.chats);

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
		useDispatch(fetchChats());
	}, []);
	const fetchChats = () => {
		dispatch(getChats());
	};
	return (
		<Box
			d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
			alignItems='center'
			flexDir='column'
			p={3}
			bg='white'
			w={{ base: '100%', md: '68%' }}
			borderRadius='lg'
			borderWidth='1px'
		>
			ChatsBox
		</Box>
	);
};

export default ChatBox;
