/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  
})

const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
