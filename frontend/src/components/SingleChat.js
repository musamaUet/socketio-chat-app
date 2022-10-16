import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getChats,
	getUserChats,
	setSelectedChat,
} from '../redux/actions/chats.action';
import { Box, IconButton, Text } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const dispatch = useDispatch();
	const { data: chatData } = useSelector((state) => state.chats);
	const { selectedChat } = chatData;
	const { userProfile: loggedUser } = useSelector((state) => state.user);

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
