import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
	isSameSender,
	isLastMessage,
	isSameUser,
	isSameSenderMargin,
} from '../config/ChatLogics';
import { useSelector } from 'react-redux';
import { Tooltip, Avatar } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
	const { userProfile: loggedUser } = useSelector((state) => state.user);

	return (
		<ScrollableFeed>
			{messages &&
				messages.map((message, index) => (
					<div style={{ display: 'flex' }} key={index}>
						{(isSameSender(messages, message, index, loggedUser._id) ||
							isLastMessage(messages, index, loggedUser._id)) && (
							<Tooltip
								label={message.sender.name}
								placement='bottom-start'
								hasArrow
							>
								<Avatar
									mt='7px'
									mr={1}
									size='sm'
									cursor='pointer'
									name={message.sender.name}
									src={message.sender.pic}
								/>
							</Tooltip>
						)}
						<span
							style={{
								backgroundColor: `${
									message.sender._id === loggedUser._id ? '#BEE3F8' : '#B9F5D0'
								}`,
								marginLeft: isSameSenderMargin(
									messages,
									message,
									index,
									loggedUser._id
								),
								marginTop: isSameUser(messages, message, index, loggedUser._id)
									? 3
									: 10,
								borderRadius: '20px',
								padding: '5px 15px',
								maxWidth: '75%',
							}}
						>
							{message.content}
						</span>
					</div>
				))}
		</ScrollableFeed>
	);
};

export default ScrollableChat;
