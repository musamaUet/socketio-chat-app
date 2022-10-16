import React, { useState, useEffect } from 'react';
import {
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	Input,
	Spinner,
	ModalFooter,
	Box,
	useDisclosure,
	ModalOverlay,
	ModalContent,
	ModalHeader,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChat } from '../../redux/actions/chats.action';
import { useCustomToast } from '../../hooks/showToast';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';
import axios from 'axios';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
	const dispatch = useDispatch();
	const { customToast } = useCustomToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data: chatData } = useSelector((state) => state.chats);
	const { selectedChat } = chatData;
	const { userProfile: loggedUser } = useSelector((state) => state.user);

	const [groupChatName, setGroupChatName] = useState('');
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameLoading, setRenameLoading] = useState(false);

	const handleRemove = async (user) => {
		if (
			selectedChat.groupAdmin._id !== loggedUser._id &&
			user._id !== loggedUser._id
		) {
			customToast({
				title: 'Only admins can remove someone!',
				status: 'error',
			});
			return;
		}

		try {
			setLoading(true);
			const payload = {
				chatId: selectedChat._id,
				userId: user._id,
			};
			const { data } = await axios.put(`/api/chat/groupremove`, payload);

			user._id === loggedUser._id ? setSelectedChat() : setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			// fetchMessages();
			setLoading(false);
		} catch (error) {
			customToast({
				title: error.response.data.message,
				status: 'error',
			});
			setLoading(false);
		}
		setGroupChatName('');
	};
	const handleRename = async () => {
		if (!groupChatName) return;
		try {
			setRenameLoading(true);
			const payload = {
				chatId: selectedChat._id,
				chatName: groupChatName,
			};
			const { data } = await axios.put(`/api/chat/rename`, payload);
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (error) {
			setRenameLoading(false);
			customToast({
				title: error.response.data.message,
				status: 'error',
				position: 'bottom',
			});
		}
		setGroupChatName('');
	};
	const handleSearch = async (query) => {
		setSearch(query);
		setLoading(true);

		if (!query) return;
		try {
			const { data } = await axios.get(`/api/user?search=${search}`);
			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			setLoading(false);
			customToast({
				title: 'Failed to load the search result',
				status: 'error',
				position: 'bottom-left',
			});
		}
	};
	const handleAddUser = async (user) => {
		if (selectedChat.users.find((u) => u._id === user._id)) {
			customToast({
				title: 'User Already in group!',
				status: 'error',
			});
			return;
		}

		if (selectedChat.groupAdmin._id !== loggedUser._id) {
			customToast({
				title: 'Only admins can add someone!',
				status: 'error',
			});
			return;
		}
		try {
			setLoading(true);
			const payload = {
				chatId: selectedChat._id,
				userId: user._id,
			};
			const { data } = await axios.put(`/api/chat/groupadd`, payload);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (error) {
			customToast({
				title: error.response.data.message,
				status: 'error',
			});
			setLoading(false);
		}
		setGroupChatName('');
	};

	return (
		<>
			<IconButton
				display={{ base: 'flex' }}
				icon={<ViewIcon />}
				onClick={onOpen}
			/>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='35px'
						fontFamily='Work sans'
						display='flex'
						justifyContent='center'
					>
						{selectedChat.chatName}
					</ModalHeader>

					<ModalCloseButton />
					<ModalBody display='flex' flexDir='column' alignItems='center'>
						<Box w='100%' display='flex' flexWrap='wrap' pb={3}>
							{selectedChat.users.map((u) => (
								<UserBadgeItem
									key={u._id}
									user={u}
									admin={selectedChat.groupAdmin}
									handleFunction={() => handleRemove(u)}
								/>
							))}
						</Box>
						<FormControl display='flex'>
							<Input
								placeholder='Chat Name'
								mb={3}
								value={groupChatName}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
							<Button
								variant='solid'
								colorScheme='teal'
								ml={1}
								isLoading={renameLoading}
								onClick={handleRename}
							>
								Update
							</Button>
						</FormControl>
						<FormControl>
							<Input
								placeholder='Add User to group'
								mb={1}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>

						{loading ? (
							<Spinner size='lg' />
						) : (
							searchResult &&
							searchResult.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => handleAddUser(user)}
								/>
							))
						)}
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => handleRemove(loggedUser)} colorScheme='red'>
							Leave Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UpdateGroupChatModal;
