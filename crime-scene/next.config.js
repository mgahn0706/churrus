/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/scenarios",
        permanent: true,
      },
      {
        source: "/scenarios/scenario/jjajang/:path*",
        destination: "/scenarios/scenario/psychic/:path*",
        permanent: true,
      },
      {
        source: "/image/scenario/jjajang/jjajang-main.png",
        destination: "/image/scenario/psychic/psychic-main.png",
        permanent: true,
      },
      {
        source: "/image/certiciation-card/jjajang.png",
        destination: "/image/certiciation-card/psychic.png",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
