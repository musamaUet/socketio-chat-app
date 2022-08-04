import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './redux/actions';
import './App.css';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const user = localStorage.getItem('userInfo');
		if (user) {
			dispatch(setUserInfo(JSON.parse(user)));
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
