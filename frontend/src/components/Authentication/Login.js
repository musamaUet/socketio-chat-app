import React, { useState } from 'react';
import {
	VStack,
	FormControl,
	Input,
	FormLabel,
	InputGroup,
	InputRightElement,
	Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../hooks/showToast';

const Login = () => {
	const navigate = useNavigate();
	const { customToast } = useCustomToast();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const submitHandler = async () => {
		if (!email || !password) {
			customToast({
				title: 'Please Fill all the Feilds',
				status: 'warning',
			});
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post('/api/user/login', { email, password });
			customToast({
				title: 'Login Successful',
				status: 'success',
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			setLoading(false);
			navigate('/chats');
		} catch (error) {
			customToast({
				title: 'Error Occured!',
				description: error.response.data.message,
				status: 'error',
			});
			setLoading(false);
		}
	};

	return (
		<VStack spacing='5px'>
			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder='Enter your email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement
						width='4.5rem'
						onClick={() => setShowPassword(!showPassword)}
					>
						<Button h='1.75rem' size='sm'>
							{showPassword ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={loading}
			>
				Login
			</Button>
			<Button
				variant='solid'
				colorScheme='red'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={() => {
					setEmail('guest@example.com');
					setPassword('123456');
				}}
				isLoading={loading}
			>
				Login with Guest User
			</Button>
		</VStack>
	);
};

export default Login;
