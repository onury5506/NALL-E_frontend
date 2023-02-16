/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nalle.s3.eu-west-3.amazonaws.com'],
  },
  env: {
    GRAPHQL_SERVER: process.env.GRAPHQL_SERVER,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
  }
}

module.exports = nextConfig