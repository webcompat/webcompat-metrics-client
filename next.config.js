const withCSS = require("@zeit/next-css");
const Dotenv = require("dotenv-webpack");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

module.exports = withCSS({
  webpack: (config) => {
    config.plugins.push(
      new Dotenv({ safe: true, systemvars: true, defaults: true }),
    );
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    );
    return config;
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
});
