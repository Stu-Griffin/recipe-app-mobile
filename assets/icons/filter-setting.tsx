import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function FilterSettingIcon({ props }: any) {
	return (
		<Svg
			width={40}
			height={40}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Rect width={40} height={40} rx={10} fill="#129575" />
			<Path
				d="M28.333 16.042h-5a.63.63 0 01-.625-.625.63.63 0 01.625-.625h5a.63.63 0 01.625.625.63.63 0 01-.625.625zM15 16.042h-3.333a.63.63 0 01-.625-.625.63.63 0 01.625-.625H15a.63.63 0 01.625.625.63.63 0 01-.625.625z"
				fill="#fff"
			/>
			<Path
				d="M18.333 18.958a3.55 3.55 0 01-3.541-3.541 3.55 3.55 0 013.541-3.542 3.55 3.55 0 013.542 3.542 3.55 3.55 0 01-3.542 3.541zm0-5.833a2.29 2.29 0 00-2.291 2.292 2.29 2.29 0 002.291 2.291 2.29 2.29 0 002.292-2.291 2.29 2.29 0 00-2.292-2.292zM28.333 25.208H25a.63.63 0 01-.625-.625.63.63 0 01.625-.625h3.333a.63.63 0 01.625.625.63.63 0 01-.625.625zM16.667 25.208h-5a.63.63 0 01-.625-.625.63.63 0 01.625-.625h5a.63.63 0 01.625.625.63.63 0 01-.625.625z"
				fill="#fff"
			/>
			<Path
				d="M21.667 28.125a3.55 3.55 0 01-3.542-3.542 3.55 3.55 0 013.542-3.541 3.55 3.55 0 013.541 3.541 3.55 3.55 0 01-3.541 3.542zm0-5.833a2.29 2.29 0 00-2.292 2.291 2.29 2.29 0 002.292 2.292 2.29 2.29 0 002.291-2.292 2.29 2.29 0 00-2.291-2.291z"
				fill="#fff"
			/>
		</Svg>
	);
}

export default FilterSettingIcon;
