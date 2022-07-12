import produce from 'immer';

import { SET_USER_INFO } from '../types';

const initialUserState = {
	userProfile: {},
};

const userReducer = (state = initialUserState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SET_USER_INFO:
				console.log(
					'Get_USER_INFO action dispatched and inside reducer',
					JSON.parse(action.payload)
				);
				draft.userProfile = JSON.parse(action.payload);
				break;
			default:
				return null;
		}
	});
};

export default userReducer;
