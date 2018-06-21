// webpack.config.js
const path = require("path");

const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const StylesVariables = require("./src/constants/StylesVariables");

const SRC_DIRECTORY = path.resolve(__dirname, "src");
const BUILD_DIRECTORY = path.resolve(__dirname, "build");
const RESOURCES_DIRECTORY = path.resolve(__dirname, "src/resources");
const PUBLIC_PATH = "/"

module.exports = env => {
  const DEBUG = env.NODE_ENV === "development";
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
                modules: true,
                localIdentName: "[path]-[local]--[hash:base64:5]",
                importLoaders: 1,
                minimize: PROD,
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
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        BASENAME: JSON.stringify(DEBUG ? PUBLIC_PATH : "/webcompat-metrics-client"),
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(RESOURCES_DIRECTORY, "index.html"),
      }),
    ],
    devServer: {
      publicPath: PUBLIC_PATH,
      historyApiFallback: true,
      contentBase: BUILD_DIRECTORY,
      port: 3001,
      compress: true,
      open: true,
      proxy: {
        "/api": {
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        },
      },
    },
  };
};
