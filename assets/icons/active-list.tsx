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
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.97 2.5c-6.387 0-7.466.932-7.466 8.429 0 8.393-.157 10.571 1.44 10.571 1.594 0 4.2-3.684 6.026-3.684 1.827 0 4.432 3.684 6.027 3.684 1.596 0 1.44-2.178 1.44-10.571 0-7.497-1.08-8.429-7.467-8.429z"
				fill="#DBEBE7"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.97 1.75c-1.601 0-2.932.057-4.011.278-1.093.224-1.994.628-2.67 1.37-.67.732-1.042 1.71-1.255 2.921-.213 1.21-.28 2.728-.28 4.61l-.002 2.048c-.006 3.024-.01 5.104.127 6.46.081.81.222 1.496.53 1.99.166.265.386.484.672.63.281.145.578.193.862.193.649 0 1.278-.357 1.786-.71.495-.344 1.017-.79 1.51-1.212l.118-.1c.544-.465 1.056-.894 1.537-1.21.498-.326.848-.452 1.076-.452.228 0 .579.126 1.077.453.48.315.992.744 1.537 1.21l.117.1c.493.42 1.015.867 1.51 1.211.508.353 1.137.71 1.786.71.284 0 .58-.049.862-.192.286-.147.506-.366.672-.632.309-.493.449-1.18.53-1.99.137-1.355.133-3.435.128-6.46-.002-.639-.003-1.32-.003-2.047 0-1.882-.067-3.4-.28-4.61-.213-1.212-.585-2.189-1.254-2.922-.677-.74-1.577-1.145-2.67-1.369-1.08-.22-2.41-.278-4.012-.278zm-6.716 9.179c0-1.867.068-3.276.257-4.35.189-1.071.486-1.733.885-2.17.391-.429.958-.726 1.863-.911.92-.189 2.119-.248 3.711-.248 1.592 0 2.792.06 3.71.248.907.185 1.473.482 1.864.91.4.438.697 1.1.885 2.171.19 1.074.257 2.483.257 4.35l.002 2.082c.006 3.026.009 5.003-.12 6.276-.078.784-.198 1.166-.309 1.344-.043.07-.073.086-.083.091a.398.398 0 01-.179.028c-.149 0-.443-.104-.93-.442-.43-.3-.897-.698-1.41-1.135l-.1-.085c-.534-.456-1.115-.948-1.687-1.323-.554-.364-1.214-.699-1.9-.699-.685 0-1.346.335-1.9.699-.572.375-1.153.867-1.687 1.323l-.1.085c-.513.438-.979.836-1.41 1.136-.486.337-.781.441-.93.441a.397.397 0 01-.178-.028c-.011-.005-.04-.021-.084-.091-.111-.178-.23-.56-.31-1.344-.128-1.273-.124-3.25-.12-6.276.002-.645.003-1.338.003-2.082zm3.288-2.461a.75.75 0 100 1.5h6.855a.75.75 0 000-1.5H8.542z"
				fill="#129575"
			/>
		</Svg>
	);
}

export default SvgComponent;
