import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AddButtonIcon({ props }: any) {
	return (
		<Svg
			width={48}
			height={48}
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
				fill="#129575"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M25.213 18.214a1.214 1.214 0 10-2.426 0v4.572h-4.574a1.214 1.214 0 000 2.428h4.574v4.572a1.214 1.214 0 102.426 0v-4.572h4.574a1.214 1.214 0 000-2.428h-4.574v-4.572z"
				fill="#fff"
			/>
		</Svg>
	);
}

export default AddButtonIcon;