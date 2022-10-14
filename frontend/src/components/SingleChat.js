import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChats, getUserChats } from '../redux/actions/chats.action';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const dispatch = useDispatch();
	const { data: chatData } = useSelector((state) => state.chats);
	const { userProfile: loggedUser } = useSelector((state) => state.user);

	return <div></div>;
};
export default SingleChat;
