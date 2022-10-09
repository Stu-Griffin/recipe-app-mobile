declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.jpeg'
declare module '*.tiff'
declare module '*.svg' {
	import React from 'react';
	import { SvgProps } from 'react-native-svg';
	const content: React.FC<SvgProps>;
	export default content;
}