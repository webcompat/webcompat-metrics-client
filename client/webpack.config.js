// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const SRC_DIRECTORY = path.resolve(__dirname, "src");
const PUBLIC_DIRECTORY = path.resolve(__dirname, "public");

module.exports = env => {
  const DEBUG = env.NODE_ENV === "development";
  const PROD = env.NODE_ENV === "production";

  return {
    entry: {
      index: path.resolve(SRC_DIRECTORY, "index.js")
    },
    output: {
      filename: "[name].js",
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
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
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
          })
        }
      ]
    },
    stats: {
      children: false
    },
    devtool: DEBUG ? "source-map" : "hidden-source-map",
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(SRC_DIRECTORY, "resources"),
          to: path.resolve(PUBLIC_DIRECTORY)
        }
      ])
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
