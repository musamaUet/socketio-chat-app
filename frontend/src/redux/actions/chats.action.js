import { GET_USER_CHATS_REQUEST } from '../types';

export const getUserChats = (userId) => {
	return {
		type: GET_USER_CHATS_REQUEST,
		userId,
	};
};
