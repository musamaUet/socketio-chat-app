import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import {
	NEW_USER_INFO,
	NEW_USER_INFO_ERROR,
	SET_USER_INFO,
	GET_LOGGEDIN_USER_INFO,
} from '../types';

const initialUserState = {
	userProfile: {},
	fakeData: [],
	loading: false,
	errors: '',
};

function userReducer(state = initialUserState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case SET_USER_INFO:
				draft.userProfile = action.payload;
				break;
			case GET_LOGGEDIN_USER_INFO:
				const userProfile = JSON.parse(localStorage.getItem('userInfo'));
				if (!isEmpty(userProfile)) {
					draft.userProfile = action.payload;
				} else {
					draft.userProfile = {};
				}
				break;
			case NEW_USER_INFO:
				draft.fakeData = action.data;
				break;
			case NEW_USER_INFO_ERROR:
				draft.errors = action.errors;
				break;
			default:
				return state;
		}
	});
}

export { userReducer };
