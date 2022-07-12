import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { SET_USER_INFO } from '../types';

const initialUserState = {
	userProfile: {},
};

export const userReducer = (state = initialUserState, action) => {
	return produce((state, draft) => {
		debugger;
		switch (action.type) {
			case SET_USER_INFO:
				debugger;
				console.log(
					'Get_USER_INFO action dispatched and inside reducer',
					action
				);
				draft.userProfile = action.payload;
				break;
			default:
				return null;
		}
	});
};
