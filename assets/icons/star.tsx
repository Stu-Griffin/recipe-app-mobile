import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent({ props }: any) {
	return (
		<Svg
			width={8}
			height={8}
			viewBox="0 0 8 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<G clipPath="url(#clip0_36_922)">
				<Path
					d="M6.156 7.5a.25.25 0 01-.146-.047L4 5.996 1.99 7.453a.25.25 0 01-.383-.282l.784-2.322L.359 3.456A.25.25 0 01.5 3h2.506L3.762.673a.25.25 0 01.476 0L4.994 3H7.5a.25.25 0 01.141.456L5.61 4.85l.784 2.321a.25.25 0 01-.237.33z"
					fill="#FFAD30"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_36_922">
					<Path fill="#fff" d="M0 0H8V8H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

export default SvgComponent;