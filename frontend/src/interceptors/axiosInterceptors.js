import axios from 'axios';

axios.interceptors.request.use((request) => {
	if (!request.url.includes('login') && !request.url.includes('signup')) {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const token = userInfo.token;
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		request.headers = headers;

		return request;
	}
	return request;
});
