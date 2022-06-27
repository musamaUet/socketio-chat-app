import { useToast } from '@chakra-ui/react';

export const useCustomToast = () => {
	const toast = useToast();
	function customToast({ title, status, description }) {
		return toast({
			title,
			status,
			description,
			duration: 3000,
			isClosable: true,
		});
	}
	return {
		customToast,
	};
};
