import { SET_USER_INFO } from '../types';

export const setUserInfo = (userInfo) => (dispatch) => {
	console.log('action called', userInfo, SET_USER_INFO);
	dispatch({
		type: SET_USER_INFO,
		payload: userInfo,
	});
};
