/* eslint-disable @typescript-eslint/no-var-requires */
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true
  },
  images: {
    domains: ['avatars.githubusercontent.com']
  }
}

module.exports = withSvgr(nextConfig);