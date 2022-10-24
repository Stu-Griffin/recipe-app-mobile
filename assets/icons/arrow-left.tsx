import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowLeftIcon({ props }: any) {
	return (
		<Svg
			width={20}
			height={20}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M7.975 4.942L2.917 10l5.058 5.058M17.083 10H3.058"
				stroke="#121212"
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default ArrowLeftIcon;
