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
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

import './styles.css';
import { GET_LOGGEDIN_USER_INFO } from '../redux/types';
import { getUserInfo } from '../redux/actions';

const ENDPOINT = 'http://localhost:8000';
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const dispatch = useDispatch();
	const { customToast } = useCustomToast();

	const { data: chatData } = useSelector((state) => state.chats);
	const { selectedChat } = chatData;
	const { userProfile: loggedUser } = useSelector((state) => state.user);

	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [socketConnected, setSocketConnected] = useState(false);

	const sendMessage = async (event) => {
		if (event.key === 'Enter' && newMessage) {
			try {
				const payload = {
					content: newMessage,
					chatId: selectedChat._id,
				};
				setNewMessage('');
				const { data } = await axios.post('/api/message', payload);
				setMessages([...messages, data]);
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
	const fetchMessages = async () => {
		if (isEmpty(selectedChat)) return;

		try {
			setLoading(true);
			const { data } = await axios.get(`/api/message/${selectedChat._id}`);
			setMessages(data);
			setLoading(false);
			socket.emit('join-chat', selectedChat._id);

			socket.emit('new-message', data);
		} catch (error) {
			customToast({
				title: 'Failed to Load the Messages',
				status: 'error',
			});
		}
	};

	useEffect(() => {
		fetchMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		let loggedUserInfo;
		socket = io(ENDPOINT);
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (!isEmpty(userInfo)) {
			dispatch(getUserInfo());
			loggedUserInfo = userInfo;
			socket.emit('setup', loggedUserInfo);

			socket.on('connecttion', () => {
				setSocketConnected(true);
			});
		}
	}, []);

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
									fetchMessages={fetchMessages}
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
						{loading ? (
							<Spinner
								size='xl'
								w={20}
								h={20}
								margin='auto'
								alignSelf='center'
							/>
						) : (
							<div className='messages'>
								<ScrollableChat messages={messages} />
							</div>
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
