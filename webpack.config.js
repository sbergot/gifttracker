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
        gift : path.join(clientPath, "index.gift.tsx"),
        event : path.join(clientPath, "index.event.tsx"),
        individual : path.join(clientPath, "index.individual.tsx")
    },

    output: {
        filename: 'wwwroot/js/[name].js'
    },


    resolve: {
        extensions: ['.ts', '.tsx'],
        modules: [clientPath, "node_modules"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: 'awesome-typescript-loader' } }
        ]
    }
}