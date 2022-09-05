import { all } from 'redux-saga/effects';
import { getUserChatsWatcher } from './chat.saga';

export default function* rootSaga() {
	yield all([getUserChatsWatcher()]);
}
