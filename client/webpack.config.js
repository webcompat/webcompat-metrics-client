// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_DIRECTORY = path.resolve(__dirname, "src");
const PUBLIC_DIRECTORY = path.resolve(__dirname, "public");
const RESOURCES_DIRECTORY = path.resolve(__dirname, "src/resources");

module.exports = env => {
  const DEBUG = env.NODE_ENV === "development";
  const PROD = env.NODE_ENV === "production";

  return {
    entry: {
      index: path.resolve(SRC_DIRECTORY, "index.js"),
      vendor: [
        "react",
        "react-dom"
      ],
    },
    output: {
      filename: "[name].[chunkhash:8]js",
      path: PUBLIC_DIRECTORY,
      publicPath: "/"
    },
    mode: env.NODE_ENV,
    resolve: {
      extensions: [".js", ".css"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /styles(-[a-z]+)?\.css$/,
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]--[hash:base64:5]",
                minimize: PROD,
                sourceMap: !PROD
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")(),
                  require("postcss-url")(),
                  require("postcss-cssnext")({}),
                  require("postcss-reporter")()
                ]
              }
            }
          ]
        }
      ]
    },
    stats: {
      children: false
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: "vendor",
            enforce: true,
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(RESOURCES_DIRECTORY, "index.html"),
      })
    ],
    devServer: {
      contentBase: PUBLIC_DIRECTORY,
      port: 3001,
      compress: true,
      open: true,
      proxy: {
        "/api": "http://localhost:3000"
      }
    }
  };
};
