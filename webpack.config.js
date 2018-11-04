var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const clientPath = path.resolve("./client");

module.exports = {
    externals : {
        "jquery" : "jQuery",
        "bootstrap" : "jQuery",
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devtool: "inline-source-map",

    entry: {
        gift : path.join(clientPath, "index.gift.tsx"),
        event : path.join(clientPath, "index.event.tsx"),
        individual : path.join(clientPath, "index.individual.tsx")
    },

    output: {
        path: path.resolve('./WebApplication/wwwroot/js'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', 'jsx'],
        // modules: [clientPath, "node_modules"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: 'ts-loader' } }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000
        }
    },

    plugins: [
        new BundleAnalyzerPlugin()
    ]
}