import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { enableES5 } from 'immer';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import Interceptors from './interceptors/axiosInterceptors';
import App from './App';
import store from './redux/store';

import './Interceptor';

enableES5();
const configStore = store();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={configStore}>
		<ChakraProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
