import React from 'react';
import { Box } from '@chakra-ui/layout';
import SingleChat from './SingleChat';
import { useSelector } from 'react-redux';

import './styles.css';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const { data: chatData } = useSelector((state) => state.chats);

	return (
		<Box
			d={{ base: chatData.selectedChat ? 'flex' : 'none', md: 'flex' }}
			alignItems='center'
			flexDir='column'
			p={3}
			bg='white'
			w={{ base: '100%', md: '68%' }}
			borderRadius='lg'
			borderWidth='1px'
		>
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</Box>
	);
};

export default ChatBox;
