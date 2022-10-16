import React from 'react';
import { Box } from '@chakra-ui/layout';
import SingleChat from './SingleChat';
import { useSelector } from 'react-redux';

import './styles.css';
import { isEmpty } from 'lodash';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const { data: chatData } = useSelector((state) => state.chats);

	return (
		<Box
			display={{
				base: !isEmpty(chatData.selectedChat) ? 'flex' : 'none',
				md: 'flex',
			}}
			alignItems='center'
			flexDir='column'
			padding={3}
			bg='white'
			w={{ base: '100%', md: '68%' }}
			borderRadius='lg'
			borderWidth='1px'
			marginLeft={{ base: '0px', md: '10px' }}
		>
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</Box>
	);
};

export default ChatBox;
