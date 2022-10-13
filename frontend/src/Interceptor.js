import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.interceptors.request.use(
	(req) => {
		// Add configurations here
		return req;
	},
	(err) => {
		return Promise.reject(err);
	}
);

// // For POST requests
// axios.interceptors.response.use(
// 	(res) => {
// 		// Add configurations here
// 		if (res.status === 201) {
// 			console.log('Posted Successfully');
// 		}
// 		return res;
// 	},
// 	(err) => {
// 		return Promise.reject(err);
// 	}
// )
