import { memo } from 'react';
import { TypewriterEffect } from './ui/typewritter';

const words = [
	{
		text: 'Chào'
	},
	{
		text: 'mừng'
	},
	{
		text: 'tới'
	},
	{
		text: 'Cứt',
		className: 'text-acent'
	},
	{
		text: 'Truyện.',
		className: 'text-acent'
	}
];

const Loading = () => {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<TypewriterEffect words={words} />
		</div>
	);
};

export default memo(Loading);
