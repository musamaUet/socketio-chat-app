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

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [pic, setPic] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const postDetails = (file) => {};

	const submitHandler = () => {};

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
				// isLoading={picLoading}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default SignUp;
