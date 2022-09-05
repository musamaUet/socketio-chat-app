import axios from 'axios';

export const getUserChats = async (action, token) => {
	console.log('test', test);
	console.log('data', action);
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
