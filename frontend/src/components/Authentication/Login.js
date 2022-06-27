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

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const submitHandler = () => {};

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
				// isLoading={picLoading}
			>
				Login
			</Button>
			<Button
				variant='solid'
				colorScheme='red'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				// isLoading={picLoading}
			>
				Login with Guest User
			</Button>
		</VStack>
	);
};

export default Login;
