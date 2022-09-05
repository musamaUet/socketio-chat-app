import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
	GET_USER_CHATS_REQUEST,
	GET_USER_CHATS_SUCCESSS,
	GET_USER_CHATS_FAILURE,
} from '../types';
import * as api from '../../services/chats.service';

function* getUserChats(action) {
	try {
		const userState = yield select((state) => state.user.userProfile);
		const result = yield call(api.getUserChats, action, userState.token);

		yield put({
			type: GET_USER_CHATS_SUCCESSS,
			data: result,
		});
	} catch (e) {
		console.log('e', e);
		yield put({
			type: GET_USER_CHATS_FAILURE,
			e: e.response,
		});
	}
}

export function* getUserChatsWatcher() {
	yield takeEvery(GET_USER_CHATS_REQUEST, getUserChats);
}
