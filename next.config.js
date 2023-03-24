/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Если мы видим файл свг
      use: ["@svgr/webpack"], //то мы с вами используем специальный загрузчик svgr
    });
    return config;
  },
};
