import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import history from '../utils/history';
import rootReducer from './reducers';
import rootSaga from './sagas';

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware, routerMiddleware(history)];

// const store = createStore(rootReducer, applyMiddleware(thunk));

// sagaMiddleware.run(rootSaga);
// export default store;

export default function configureStore(initialState = {}) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
