import axios from 'axios';

export const getUserChats = async (action, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(
		`/api/chat`,
		{ userId: action.userId },
		config
	);
	return data;
};

export const getChats = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(`/api/chat`, config);
	return data;
};
