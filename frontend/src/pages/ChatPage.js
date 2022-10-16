import React from 'react';
import { Box } from '@chakra-ui/layout';
import { useState } from 'react';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { useSelector } from 'react-redux';

const Chatpage = () => {
	const user = useSelector((state) => state.user.userProfile);
	const [fetchAgain, setFetchAgain] = useState(false);

	return (
		<div style={{ width: '100%' }}>
			{user && <SideDrawer />}
			<Box
				display='flex'
				justifyContent='space-between'
				width='100%'
				height='91.5vh'
				padding='10px'
			>
				{user && <MyChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			</Box>
		</div>
	);
};

export default Chatpage;
