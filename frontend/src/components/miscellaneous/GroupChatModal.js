import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	Input,
	useToast,
	Box,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useCustomToast } from '../../hooks/showToast';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import { getChats } from '../../redux/actions/chats.action';

const GroupChatModal = ({ children }) => {
	const dispatch = useDispatch();
	const { customToast } = useCustomToast();
	const { data: chatData } = useSelector((state) => state.chats);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = async (value) => {
		setSearch(value);
		if (!value) {
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.get(`/api/user?search=${value}`);
			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			setLoading(false);
			customToast({
				title: 'Error Occured! Failed to load search',
				status: 'error',
			});
		}
	};
	const handleGroup = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			customToast({
				title: 'User already added!',
				status: 'warning',
				position: 'top',
			});
			return;
		}
		setSelectedUsers([...selectedUsers, userToAdd]);
	};
	const handleDelete = (userToDelete) => {
		setSelectedUsers(
			selectedUsers.filter((user) => user._id !== userToDelete._id)
		);
	};
	const handleSubmit = async () => {
		if (!groupChatName || !selectedUsers) {
			customToast({
				title: 'Please fill all the fields',
				status: 'warning',
			});
			return;
		}
		try {
			const payload = {
				name: groupChatName,
				users: JSON.stringify(selectedUsers.map((user) => user._id)),
			};
			const { data } = axios.post('/api/chat/group', payload);
			// setChats([data, ...chatData.chats]);
			dispatch(getChats());
			onClose();
			customToast({
				title: 'New group chat created!',
				status: 'success',
				position: 'bottom',
			});
		} catch (error) {
			customToast({
				title: 'Please fill all the fields',
				status: 'warning',
			});
		}
	};
	return (
		<>
			<span onClick={onOpen}>{children}</span>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='35px'
						fontFamily='Work sans'
						display='flex'
						justifyContent='center'
					>
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display='flex' flexDir='column' alignItems='center'>
						<FormControl>
							<Input
								placeholder='Chat Name'
								mb='3'
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<Input
								placeholder='Add Users eg: John, Smith'
								mb='1'
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
						{selectedUsers.map((user) => (
							<Box w='100%' display='flex' flexWrap='wrap'>
								<UserBadgeItem
									key={user._id}
									user={user}
									handleFunction={() => handleDelete()}
								/>
							</Box>
						))}
						{loading ? (
							<div>Loading...</div>
						) : (
							searchResult
								.slice(0, 4)
								.map((user) => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() => handleGroup(user)}
									/>
								))
						)}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' onClick={() => handleSubmit()}>
							Create Chat
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GroupChatModal;
