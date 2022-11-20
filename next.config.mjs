// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: { appDir: true },
  images: {
    domains: ["images.deliveryhero.io"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.deliveryhero.io",
    //     port: "",
    //     pathname: "image/fd-cz/LH/**",
    //   },
    // ],
  },
};
export default config;
