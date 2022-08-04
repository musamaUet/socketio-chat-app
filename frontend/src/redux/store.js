import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import history from '../utils/history';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore() {
	let composeEnhancers = compose;
	if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
	}

	const sagaMiddleware = createSagaMiddleware();

	const middlewares = [sagaMiddleware, routerMiddleware(history)];

	const enhancers = [applyMiddleware(...middlewares)];
	const store = createStore(rootReducer(), composeEnhancers(...enhancers));
	sagaMiddleware.run(rootSaga);

	return store;
}
