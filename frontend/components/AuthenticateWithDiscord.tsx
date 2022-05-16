import React from 'react';
import DiscordSVG from './../svg/DiscordSVG';

type Props = {
	className: string | undefined;
};

const AuthenticateWithDiscord = ({ className = '' }: Props) => {
	return (
		<div
			className={`flex items-center w-fit bg-accent py-2 px-4 rounded ${className}`}>
			<DiscordSVG />
			<p className='font-semibold text-lg h-fit w-fit ml-4'>
				Authenticate
			</p>
		</div>
	);
};

export default AuthenticateWithDiscord;
