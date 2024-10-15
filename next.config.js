/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",

            }
        ]
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    }
}

module.exports = nextConfig