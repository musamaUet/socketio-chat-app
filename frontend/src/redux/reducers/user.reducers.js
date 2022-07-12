import produce from 'immer';

import { SET_USER_INFO } from '../types';

const initialUserState = {
	userProfile: {},
};

export const userReducer = (state = initialUserState, action) => {
	// return produce((state, draft) => {
	switch (action.type) {
		case SET_USER_INFO:
			debugger;
			console.log('Get_USER_INFO action dispatched and inside reducer', action);
			return action.payload;
			// draft.userProfile = action.payload;
			break;
		default:
			return null;
	}
	// });
};
