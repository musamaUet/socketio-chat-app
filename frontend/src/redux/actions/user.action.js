import { GET_LOGGEDIN_USER_INFO, SET_USER_INFO } from '../types';

export const setUserInfo = (userInfo) => {
	return {
		type: SET_USER_INFO,
		payload: userInfo,
	};
};

export const getUserInfo = (userInfo) => {
	return { type: GET_LOGGEDIN_USER_INFO };
};
