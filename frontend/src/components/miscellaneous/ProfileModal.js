import React, { useState } from 'react';
import {
	useDisclosure,
	IconButton,
	Modal,
	ModalHeader,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	Button,
	Image,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton
					display={{ base: 'flex' }}
					icon={<ViewIcon />}
					onClick={onOpen}
				/>
			)}
			<Modal>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='40px'
						fontFamily='work sans'
						display='flex'
						justifyContent='center'
					>
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image
							borderRadius='40'
							boxSize='150px'
							src={user.pic}
							alt={user.name}
						></Image>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme={'blue'} mr='3' onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileModal;
