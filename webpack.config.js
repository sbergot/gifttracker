var webpack = require('webpack');
var path = require('path');

const clientPath = path.resolve("./client");
const tsPath = path.join(clientPath, "typescript");

module.exports = {
    externals : {
        "jquery" : "jQuery",
        "bootstrap" : "jQuery",
        "lodash" : "_",
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devtool: 'source-map',

    entry: {
        gift : path.join(tsPath, 'main.gift.ts'),
        bundle : path.join(clientPath, "index.tsx")
    },

    output: {
        filename: 'wwwroot/js/[name].js'
    },

    resolve: {
        root : clientPath,
        extensions: ['', '.ts', '.tsx']
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
}