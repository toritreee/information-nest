/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  "dest": "public",
  "scope":"/app"
});


const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = withPWA(nextConfig)
