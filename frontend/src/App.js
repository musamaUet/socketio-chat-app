import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './redux/actions';

import './App.css';
import { isEmpty } from 'lodash';

const App = () => {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('userInfo'));
		if (!isEmpty(user)) {
			dispatch(setUserInfo(user));
			navigate('/chats');
		}
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route path='/chats' element={<ChatPage />} />
			</Routes>
		</div>
	);
};

export default App;
