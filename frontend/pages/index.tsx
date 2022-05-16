import type { NextPage } from 'next';
import AuthenticateWithDiscord from '../components/AuthenticateWithDiscord';

const Home: NextPage = () => {
	return (
		<div className='h-[100vh] w-[100vw] bg-primaryBg pt-12'>
			<div className='flex flex-col items-center'>
				<h2 className='text-lg'>Welcome to</h2>
				<h1 className='text-3xl'>GM's Music Box</h1>
			</div>
			<AuthenticateWithDiscord className='m-auto mt-32' />
		</div>
	);
};

export default Home;
