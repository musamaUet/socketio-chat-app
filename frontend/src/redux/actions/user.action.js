import { SET_USER_INFO } from '../types';

export const setUserInfo = (userInfo) => {
	return {
		type: SET_USER_INFO,
		payload: userInfo,
	};
};
