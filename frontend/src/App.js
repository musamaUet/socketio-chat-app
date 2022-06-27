import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
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
