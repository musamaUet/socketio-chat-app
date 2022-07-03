import { GET_USER_INFO } from '../types';

export const getUserInfo = (userInfo) => {
	return {
		type: GET_USER_INFO,
		payload: userInfo,
	};
};
