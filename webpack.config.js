// webpack.config.js
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const StylesVariables = require("./src/constants/StylesVariables");

const SRC_DIRECTORY = path.resolve(__dirname, "src");
const BUILD_DIRECTORY = path.resolve(__dirname, "build");
const RESOURCES_DIRECTORY = path.resolve(SRC_DIRECTORY, "resources");
const LOGO_DIRECTORY = path.resolve(SRC_DIRECTORY, "assets/Logo");
const PUBLIC_PATH = "/";

module.exports = env => {
  const PROD = env.NODE_ENV === "production";

  return {
    entry: {
      index: path.resolve(SRC_DIRECTORY, "index.js"),
    },
    output: {
      filename: "[name].[chunkhash:8].js",
      path: BUILD_DIRECTORY,
      publicPath: "",
    },
    mode: env.NODE_ENV,
    resolve: {
      extensions: [".js", ".css"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: PROD
                    ? "[hash:base64:5]"
                    : "[path]-[local]--[hash:base64:5]",
                },
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")(),
                  require("postcss-cssnext")({
                    features: {
                      customProperties: {
                        variables: StylesVariables,
                      },
                    },
                  }),
                  require("postcss-reporter")(),
                ],
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "raw-loader",
            },
          ],
        },
      ],
    },
    stats: {
      children: false,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      runtimeChunk: {
        name: "vendors",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(RESOURCES_DIRECTORY, "index.html"),
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(LOGO_DIRECTORY, "logo.png"),
        inject: true,
      }),
      new Dotenv({
        safe: true,
        systemvars: true,
        defaults: true,
      }),
    ],
    devServer: {
      publicPath: PUBLIC_PATH,
      contentBase: BUILD_DIRECTORY,
      port: 3001,
      compress: true,
      open: true,
      historyApiFallback: {
        index: PUBLIC_PATH,
      },
      proxy: {
        "/api": {
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        },
      },
    },
  };
};
