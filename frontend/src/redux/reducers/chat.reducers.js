import produce from 'immer';

import {
	GET_USER_CHATS_REQUEST,
	GET_USER_CHATS_SUCCESS,
	GET_USER_CHATS_FAILURE,
	GET_CHATS_REQUEST,
	GET_CHATS_SUCCESS,
	GET_CHATS_FAILURE,
	SET_SELECTED_CHAT,
	SET_CHAT_NOTIFICATIONS,
} from '../types';

const initialChatState = {
	data: {
		userChats: [],
		chats: [],
		selectedChat: {},
		notifications: [],
	},
	loading: {
		getUserChat: false,
		chats: false,
	},
	errors: {
		getUserChat: {},
		chats: {},
	},
};

function chatReducer(state = initialChatState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case GET_USER_CHATS_REQUEST:
				draft.loading.getUserChat = true;
				draft.errors.getUserChat = {};
				break;
			case GET_USER_CHATS_SUCCESS:
				draft.data.userChats = action.data;
				draft.loading.getUserChat = false;
				draft.errors.getUserChat = {};
				break;
			case GET_USER_CHATS_FAILURE:
				draft.errors = action.errors;
				draft.loading.getUserChat = false;
				break;
			case GET_CHATS_REQUEST:
				draft.loading.chats = true;
				draft.errors.chats = {};
				break;
			case GET_CHATS_SUCCESS:
				draft.data.chats = action.data;
				draft.loading.chats = false;
				draft.errors.chats = {};
				break;
			case GET_CHATS_FAILURE:
				draft.errors = action.e;
				draft.loading.chats = false;
				break;
			case SET_CHAT_NOTIFICATIONS:
				draft.data.notifications = action.data;
				break;
			case SET_SELECTED_CHAT:
				draft.data.selectedChat = action.data;
				break;
			default:
				return state;
		}
	});
}

export { chatReducer };
