import { useToast } from '@chakra-ui/react';

export const useCustomToast = () => {
	const toast = useToast();
	function customToast({ title, status, description, ...rest }) {
		return toast({
			title,
			status,
			description,
			duration: 3000,
			isClosable: true,
			...rest,
		});
	}
	return {
		customToast,
	};
};
