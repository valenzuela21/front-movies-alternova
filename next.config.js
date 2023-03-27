/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    backendURL: 'https://back-movies-alternova-production.up.railway.app/'
  }
}

module.exports = nextConfig
