const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        filename: './index.js'
    },
    devtool: "source-map",
    devServer: {
        client: {
            logging: "none"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
            // template: path.resolve(__dirname, "./index.html")
        })
    ]
}