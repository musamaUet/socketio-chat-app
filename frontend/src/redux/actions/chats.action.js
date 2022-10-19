import {
	GET_CHATS_REQUEST,
	GET_USER_CHATS_REQUEST,
	SET_CHAT_NOTIFICATIONS,
	SET_SELECTED_CHAT,
} from '../types';

export const getUserChats = (userId) => {
	return {
		type: GET_USER_CHATS_REQUEST,
		userId,
	};
};

export const getChats = () => {
	return { type: GET_CHATS_REQUEST };
};

export const setSelectedChat = (chatData) => {
	return {
		type: SET_SELECTED_CHAT,
		data: chatData,
	};
};

export const setNotifications = (notifications) => {
	return { type: SET_CHAT_NOTIFICATIONS, data: notifications };
};
