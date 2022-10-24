import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ props }: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M7.75 6.75A4.254 4.254 0 0112 2.5a4.254 4.254 0 014.25 4.249 4.238 4.238 0 01-4.089 4.241h0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0-.001 0c-.09-.01-.185-.01-.271-.001C9.524 10.891 7.75 9.036 7.75 6.75zM7.199 20.175l-.002-.001c-1.159-.773-1.737-1.772-1.737-2.794s.579-2.031 1.747-2.814c1.307-.864 3.045-1.311 4.805-1.311 1.762 0 3.495.447 4.79 1.311 1.156.77 1.729 1.77 1.738 2.796 0 1.032-.58 2.03-1.74 2.813-1.3.873-3.037 1.325-4.8 1.325s-3.5-.452-4.801-1.325z"
				fill="#DBEBE7"
				stroke="#129575"
			/>
		</Svg>
	);
}

export default SvgComponent;
