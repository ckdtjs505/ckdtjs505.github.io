/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // sonia-ui는 TS 소스로 배포되므로 Next가 빌드한다
  transpilePackages: ['sonia-ui'],
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
