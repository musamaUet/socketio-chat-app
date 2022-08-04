import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SET_USER_INFO, NEW_USER_INFO, NEW_USER_INFO_ERROR } from '../types';

const callFakeApi = async () => {
	const result = await axios.get('https://jsonplaceholder.typicode.com/todos/');
	return result;
};

function* generatorFun() {
	try {
		const apiResult = yield call(callFakeApi);
		yield put({
			type: NEW_USER_INFO,
			data: apiResult.data,
		});
	} catch (err) {
		yield put({
			type: NEW_USER_INFO_ERROR,
			errors: err,
		});
	}
}

export function* createChatWatcher() {
	yield takeEvery(SET_USER_INFO, generatorFun);
}
