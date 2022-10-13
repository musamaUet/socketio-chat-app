import axios from 'axios';

export const getUserChats = async (action) => {
	const { data } = await axios.post(`/api/chat`, { userId: action.userId });
	return data;
};

export const getChats = async () => {
	const { data } = await axios.get(`/api/chat`);
	return data;
};
