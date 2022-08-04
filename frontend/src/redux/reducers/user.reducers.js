import produce from 'immer';

import { NEW_USER_INFO, NEW_USER_INFO_ERROR, SET_USER_INFO } from '../types';

const initialUserState = {
	data: {
		userProfile: {},
		fakeData: [],
	},
	loading: {},
	errors: {
		fakeDataError: '',
	},
};

function userReducer(state = initialUserState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case SET_USER_INFO:
				draft.data.userProfile = action.payload;
				break;
			case NEW_USER_INFO:
				draft.data.fakeData = action.data;
				console.log('draft.data.fakeData', draft.data.fakeData);
				break;
			case NEW_USER_INFO_ERROR:
				draft.errors.fakeDataError = action.errors;
				break;
			default:
				return state;
		}
	});
}

export { userReducer };
