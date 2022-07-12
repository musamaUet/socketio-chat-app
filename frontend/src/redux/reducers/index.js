/* eslint-disable no-unused-vars */
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import history from '../../utils/history';
import { userReducer } from './user.reducers';

export default combineReducers({
	router: connectRouter(history),
	user: userReducer,
});
