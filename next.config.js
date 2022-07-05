const path = require("path");

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
    images: {
        domains: [
            "bscscan.com",
            "pbs.twimg.com",
            "s2.coinmarketcap.com",
            "chainstack.com",
            "cdn.iconscout.com",
            "www.coinex.net",
            "i.ibb.co",
            "media.discordapp.net",
            "icons.iconarchive.com",
            "gateway.pinata.cloud",
            "goeycoin.com"
        ],
    },
    pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};
