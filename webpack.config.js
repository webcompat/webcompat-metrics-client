// webpack.config.js
const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const StylesVariables = require("./src/constants/StylesVariables");

const SRC_DIRECTORY = path.resolve(__dirname, "src");
const BUILD_DIRECTORY = path.resolve(__dirname, "build");
const RESOURCES_DIRECTORY = path.resolve(SRC_DIRECTORY, "resources");
const LOGO_DIRECTORY = path.resolve(SRC_DIRECTORY, "assets/Logo");
const PUBLIC_PATH = "/";
const BASENAME = "webcompat-metrics-client/";
const BASENAME_PATH = `${PUBLIC_PATH}${BASENAME}`;

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
                modules: true,
                localIdentName: PROD
                  ? "[hash:base64:5]"
                  : "[path]-[local]--[hash:base64:5]",
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
      new webpack.DefinePlugin({
        BASENAME: JSON.stringify(BASENAME_PATH),
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(RESOURCES_DIRECTORY, "index.html"),
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(LOGO_DIRECTORY, "logo.png"),
        inject: true,
      }),
    ],
    devServer: {
      publicPath: BASENAME_PATH,
      historyApiFallback: {
        index: BASENAME_PATH,
      },
      contentBase: BUILD_DIRECTORY,
      port: 3001,
      compress: true,
      open: true,
      openPage: BASENAME,
      proxy: {
        "/api": {
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        },
      },
    },
  };
};
