import React, { useState, useEffect } from 'react';
import {
	Box,
	Tooltip,
	Button,
	Text,
	Menu,
	MenuList,
	MenuButton,
	Avatar,
	MenuItem,
	MenuDivider,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Input,
	Spinner,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import { useCustomToast } from '../../hooks/showToast';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../useAvatar/UserListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getUserChats } from '../../redux/actions/chats.action';
import { isEmpty } from 'lodash';

const SideDrawer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { customToast } = useCustomToast();

	const user = useSelector((state) => state.user.userProfile);
	const {
		data: chatData,
		loading: loadingChat,
		errors: chatError,
	} = useSelector((state) => state.chat);

	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [loadingChat, setLoadingChat] = useState(false);

	const logoutHandler = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

	const [] = useState();

	const handleSearch = async () => {
		if (!search) {
			customToast({
				title: 'Please enter something in search',
				status: 'warning',
				position: 'top-left',
			});
			return;
		}
		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(`/api/user?search=${search}`, config);
			console.log('result', data);
			setLoading(false);
			setSearchResult(data);
		} catch (err) {
			console.log('err', err);
			setLoading(false);
		}
	};

	const accessChat = async (userId) => {
		dispatch(getUserChats(userId));
		// I think there is no need to us in this case.
		// if (!chatData.userChats.find((c) => c._id === data._id))
		// 	setChats([data, ...chats]);
		onClose();
	};
	useEffect(() => {
		if (!isEmpty(chatError.getUserChat)) {
			customToast({
				title: 'Please enter something in search',
				status: 'error',
				position: 'bottom-left',
			});
		}
	}, [chatError]);
	return (
		<>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				bg='white'
				w='100%'
				p='5px 10px 5px 10px'
				borderWidth='5px'
			>
				<Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
					<Button variant='ghost' onClick={onOpen}>
						<SearchIcon fontSize='1xl' />
						<Text d={{ base: 'none', md: 'flex' }} px='4'>
							Search User
						</Text>
					</Button>
				</Tooltip>
				<Text fontSize='2xl' fontFamily='Work sans'>
					Talk-A-Tive
				</Text>
				<div>
					<Menu>
						<MenuButton>
							<BellIcon fontSize='2xl' m='1' />
						</MenuButton>
						{/* <MenuList /> */}
					</Menu>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							<Avatar
								size='sm'
								cursor='pointer'
								name={user.name}
								src={user.pic}
							/>
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuDivider />
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>
			<Drawer placement='left' isOpen={isOpen} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
					<DrawerBody>
						<Box display='flex' paddingBottom='2'>
							<Input
								placeholder='Search by name or email'
								mr={2}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button onClick={handleSearch}>Go</Button>
						</Box>
						{loading ? (
							<ChatLoading />
						) : (
							searchResult.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								/>
							))
						)}
						{loadingChat.getUserChat && <Spinner ml='auto' display='flex' />}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SideDrawer;
