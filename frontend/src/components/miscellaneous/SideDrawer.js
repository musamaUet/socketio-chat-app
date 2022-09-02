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
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
	const user = useSelector((state) => state.user.userProfile);

	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);

	const [] = useState();
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
					<Button variant='ghost'>
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
							<ProfileModal>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuDivider />
							<MenuItem>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>
		</>
	);
};

export default SideDrawer;
