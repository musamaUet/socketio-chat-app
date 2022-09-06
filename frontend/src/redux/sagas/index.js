import { all } from 'redux-saga/effects';
import { getUserChatsWatcher, getChatsWatcher } from './chat.saga';

export default function* rootSaga() {
	yield all([getUserChatsWatcher(), getChatsWatcher()]);
}
