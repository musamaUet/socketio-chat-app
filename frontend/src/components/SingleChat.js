import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getChats,
	getUserChats,
	setSelectedChat,
} from '../redux/actions/chats.action';
import {
	Box,
	FormControl,
	IconButton,
	Input,
	Spinner,
	Text,
} from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import { useCustomToast } from '../hooks/showToast';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const dispatch = useDispatch();
	const { customToast } = useCustomToast();

	const { data: chatData } = useSelector((state) => state.chats);
	const { selectedChat } = chatData;
	const { userProfile: loggedUser } = useSelector((state) => state.user);

	const [messages, setMesssages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('');

	const sendMessage = async (event) => {
		if (event.key === 'Enter' && newMessage) {
			try {
				const payload = {
					content: newMessage,
					chatId: selectedChat._id,
				};
				setNewMessage('');
				const { data } = await axios.post('/api/message', payload);
				setMesssages([...messages, data]);
			} catch (error) {
				customToast({
					title: 'Failed to send the message',
					status: 'error',
				});
			}
		}
	};
	const typingHandler = (event) => {
		setNewMessage(event.target.value);

		// Typing Indicator Logic
	};
	return (
		<>
			{!isEmpty(selectedChat) ? (
				<>
					<Text
						fontSize={{ base: '28px', md: '30px' }}
						pb='3'
						px='2'
						w='100%'
						fontFamily='Work sans'
						display='flex'
						justifyContent={{ base: 'space-between' }}
						alignItems='center'
					>
						<IconButton
							display={{ base: 'flex', md: 'none' }}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat({})}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(loggedUser, selectedChat.users)}
								<ProfileModal
									user={getSenderFull(loggedUser, selectedChat.users)}
								/>
							</>
						) : (
							<>
								{selectedChat.chatName.toUpperCase()}
								<UpdateGroupChatModal
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
								/>
							</>
						)}
					</Text>
					<Box
						display='flex'
						flexDir='column'
						justifyContent='flex-end'
						p='3'
						bg='#E8E8E8'
						w='100%'
						h='100%'
						borderRadius='lg'
						overflow='hidden'
					>
						{/* <Messages/> */}
						{loading ? (
							<Spinner
								size='xl'
								w={20}
								h={20}
								margin='auto'
								alignSelf='center'
							/>
						) : (
							<div></div>
						)}
						<FormControl onKeyDown={sendMessage} isRequired mt={3}>
							<Input
								variant='filled'
								bg='#E0E0E0'
								placeholder='Enter a message...'
								value={newMessage}
								onChange={typingHandler}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					h='100%'
				>
					<Text fontSize='3xl' pb={3} fontFamily='Work sans'>
						Click on a user to start chatting
					</Text>
				</Box>
			)}
		</>
	);
};
export default SingleChat;
