const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable:
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'preview' ||
    process.env.NODE_ENV === 'production',
  // delete two lines above to enable PWA in production deployment
  // add your own icons to public/manifest.json
  // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
  
});

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
module.exports = withNextIntl(withPWA({
  reactStrictMode: true,
}));
