import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { GET_USER_INFO } from '../types';

const initialUserState = {
	userProfile: {},
};

export const userReducer = (state = initialUserState, action) => {
	return produce((state, draft) => {
		switch (action.type) {
			case GET_USER_INFO:
				console.log(
					'Get_USER_INFO action dispatched and inside reducer',
					action
				);
				draft.userProfile = action.payload;
				break;
			default:
				break;
		}
	});
};
