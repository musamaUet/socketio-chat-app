import { GET_CHATS_REQUEST, GET_USER_CHATS_REQUEST } from '../types';

export const getUserChats = (userId) => {
	return {
		type: GET_USER_CHATS_REQUEST,
		userId,
	};
};

export const getChats = () => {
	return { type: GET_CHATS_REQUEST };
};
