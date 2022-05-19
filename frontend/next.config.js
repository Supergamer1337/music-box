/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		BACKEND_ADDRESS: process.env.BACKEND_ADDRESS
	}
};

module.exports = nextConfig;
