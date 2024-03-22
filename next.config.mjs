/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: `
            @import "./styles/_variables.scss";
            @import "./styles/_mixins.scss";
            @import "./styles/_keyframes.scss";
        `,
    },
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            }
        )

        return config;
    },
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
