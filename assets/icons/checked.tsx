import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
	<Svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox="0 0 490.4 490.4"
		style={{
			enableBackground: 'new 0 0 490.4 490.4',
		}}
		xmlSpace="preserve"
		{...props}
	>
		<Path d="M245.2 0C110 0 0 110 0 245.2s110 245.2 245.2 245.2 245.2-110 245.2-245.2S380.4 0 245.2 0zm0 465.9c-121.7 0-220.7-99-220.7-220.7s99-220.7 220.7-220.7 220.7 99 220.7 220.7-99 220.7-220.7 220.7z" fill="#129575"/>
		<Path d="m309.4 185.5-94 93.5-34.3-34.5c-4.8-4.8-12.5-4.8-17.3-.1-4.8 4.7-4.8 12.5-.1 17.3l42.9 43.2c2.4 2.4 5.5 3.6 8.7 3.6 3.1 0 6.2-1.2 8.6-3.6l102.7-102.1c4.8-4.8 4.8-12.5.1-17.3-4.8-4.8-12.5-4.8-17.3 0z" fill="#129575"/>
	</Svg>
);

export default SvgComponent;
