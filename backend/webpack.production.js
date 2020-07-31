const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "source-map",
  entry: [path.join(__dirname, "src/bin/expressSqlite.ts")],
  externals: [nodeExternals({})],
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: false,
  },
});
