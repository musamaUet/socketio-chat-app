import React from 'react';
import { Box } from '@chakra-ui/layout';
import { useState } from 'react';
import ChatBox from '../components/miscellaneous/ChatBox';
import MyChats from '../components/MyChats';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { useSelector } from 'react-redux';

const Chatpage = () => {
	const user = useSelector((state) => state.user.userProfile);
	const [fetchAgain, setFetchAgain] = useState(false);

	console.log('user', user);
	return (
		<div style={{ width: '100%' }}>
			{user && <SideDrawer />}
			<Box d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
				{user && <MyChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			</Box>
		</div>
	);
};

export default Chatpage;
