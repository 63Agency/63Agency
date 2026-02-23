const withNextIntl = require('next-intl/plugin')(
  './src/i18n/config.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withNextIntl(nextConfig);
