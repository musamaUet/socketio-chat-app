import React, { useState } from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	VStack,
	Button,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../hooks/showToast';

const SignUp = () => {
	const navigate = useNavigate();
	const { customToast } = useCustomToast();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [pic, setPic] = useState('');
	const [picLoading, setPicLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const postDetails = (pics) => {
		setPicLoading(true);
		if (pics === undefined) {
			customToast({
				title: 'Please Select an Image',
				status: 'warning',
			});
			return;
		}
		console.log(pics);
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData();
			data.append('file', pics);

			data.append('upload_preset', 'chat-app');
			data.append('cloud_name', 'usamarabbani');
			data.append('folder', 'chat-app/user-profiles');
			fetch('https://api.cloudinary.com/v1_1/usamarabbani/image/upload', {
				method: 'post',
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
					setPicLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setPicLoading(false);
				});
		} else {
			customToast({
				title: 'Please Select an Image',
				status: 'warning',
			});
			setPicLoading(false);
			return;
		}
	};

	const submitHandler = async () => {
		setPicLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			customToast({
				title: 'Please Fill all the Feilds',
				status: 'warning',
			});
			setPicLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			customToast({
				title: 'Passwords Do Not Match',
				status: 'warning',
			});
			return;
		}
		try {
			const { data } = await axios.post('/api/user', {
				name,
				email,
				password,
				pic,
			});
			customToast({
				title: 'Registration Successful',
				status: 'success',
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			setPicLoading(false);
			navigate('/chats');
		} catch (error) {
			customToast({
				title: 'Error Occured!',
				status: 'error',
				description: error.response.data.message,
			});
			setPicLoading(false);
		}
	};

	return (
		<VStack spacing='5px'>
			<FormControl id='first-name' isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder='Enter your name'
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
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
			<FormControl>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						onChange={(e) => setConfirmPassword(e.target.value)}
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
			<FormControl id='pic'>
				<FormLabel>Upload your Picture</FormLabel>
				<Input
					type='file'
					p={0.5}
					accept='image/*'
					onChange={(e) => postDetails(e.target.files[0])}
				/>
			</FormControl>
			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={picLoading}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default SignUp;
