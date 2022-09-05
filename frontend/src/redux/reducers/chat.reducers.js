import produce from 'immer';

import {
	GET_USER_CHATS_REQUEST,
	GET_USER_CHATS_SUCCESSS,
	GET_USER_CHATS_FAILURE,
	NEW_USER_INFO,
	NEW_USER_INFO_ERROR,
	SET_USER_INFO,
} from '../types';

const initialChatState = {
	data: {
		userChats: [],
	},
	loading: {
		getUserChat: false,
	},
	errors: {
		getUserChat: {},
	},
};

function chatReducer(state = initialChatState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case GET_USER_CHATS_REQUEST:
				draft.loading.getUserChat = true;
				draft.errors.getUserChat = action.e;
				break;
			case GET_USER_CHATS_SUCCESSS:
				draft.data.userChats = action.data;
				draft.loading.getUserChat = false;
				draft.errors.getUserChat = {};
				break;
			case GET_USER_CHATS_FAILURE:
				draft.errors = action.errors;
				break;
			default:
				return state;
		}
	});
}

export { chatReducer };
