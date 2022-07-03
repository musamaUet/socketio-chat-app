import { call, put, takeEvery } from 'redux-saga/effects';

function* generatorFun() {
	try {
		const apiResult = yield call('https://jsonplaceholder.typicode.com/todos/');
		// yield put({
		// 	type: 'type',
		// 	data: apiResult,
		// });
	} catch (err) {
		console.log('api error');
	}
}

export function* createChatWatcher() {
	yield ('type', generatorFun());
}
