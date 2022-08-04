import { all } from 'redux-saga/effects';
import { createChatWatcher } from './chat.saga';

export default function* rootSaga() {
	yield all([createChatWatcher()]);
}
