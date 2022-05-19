import React from 'react';
import DiscordSVG from './../svg/DiscordSVG';

type Props = {
	className?: string;
	onClick?: () => void;
};

const AuthenticateWithDiscord = ({
	className = '',
	onClick = () => {}
}: Props) => {
	return (
		<div
			className={`flex items-center w-fit bg-accent py-2 px-4 rounded shadow-md cursor-pointer hover:shadow-lg transition-shadow ${className}`}
			onClick={() => onClick()}>
			<DiscordSVG />
			<p className='font-semibold text-lg h-fit w-fit ml-4 select-none'>
				Authenticate
			</p>
		</div>
	);
};

export default AuthenticateWithDiscord;
