const path = require("path");

console.log(__dirname);

module.exports = {
  module: {
    rules: [
      {
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "__tests__"),
        ],
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
};
