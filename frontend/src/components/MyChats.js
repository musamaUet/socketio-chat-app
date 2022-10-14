import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChats, setSelectedChat } from '../redux/actions/chats.action';
import { useCustomToast } from '../hooks/showToast';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
	const dispatch = useDispatch();

	const { customToast } = useCustomToast();

	const { loading, errors, data: chatData } = useSelector(
		(state) => state.chats
	);
	const { userProfile: loggedUser } = useSelector((state) => state.user);

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
	}, [fetchAgain]);
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
			w={{ base: '100%', md: '35%', lg: '40%' }}
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
				<GroupChatModal>
					<Button
						display='flex'
						fontSize={{ base: '17px', md: '10px', lg: '17px' }}
						rightIcon={<AddIcon />}
					>
						New Group Chat
					</Button>
				</GroupChatModal>
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
				{chatData.chats ? (
					<Stack overflowY='scroll'>
						{chatData.chats.map((chat) => (
							<Box
								onClick={() => dispatch(setSelectedChat(chat))}
								cursor='pointer'
								bg={chatData.selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
								color={chatData.selectedChat === chat ? '#FFFFFF' : '#000000'}
								px='3'
								py='2'
								borderRadius='lg'
								key={chat._id}
							>
								<Text>
									{!chat.isGroupChat
										? getSender(loggedUser, chat.users)
										: chat.chatName}
								</Text>
							</Box>
						))}
					</Stack>
				) : (
					<ChatLoading />
				)}
			</Box>
		</Box>
	);
};

export default MyChats;
