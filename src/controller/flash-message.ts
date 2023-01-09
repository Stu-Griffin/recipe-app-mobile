type MessageType = 'none' | 'default' | 'info' | 'success' | 'danger' | 'warning';

export const getTypeForFlashMsg = (status: number): MessageType => {
	switch(status) {
	case 200:
		return 'success';
	case 404:
		return 'danger';
	default: 
		return 'info';
	}
};

export const getMessageForFlashMsg = (status: number): string => {
	switch(status) {
	case 200:
		return 'Success';
	case 404:
		return 'Error';
	default: 
		return 'Info';
	}
};