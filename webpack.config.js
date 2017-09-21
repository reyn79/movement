var path = require("path");

const config = {
  entry: {
    bundle: "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "distb"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }/*,
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/
      }*/
    ]
  }
};

module.exports = config;
