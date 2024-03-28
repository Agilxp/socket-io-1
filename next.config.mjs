/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.STANDALONE ? 'standalone' : process.env.EXPORT ? 'export' : undefined,
};

export default nextConfig;
