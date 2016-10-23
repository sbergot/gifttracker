var webpack = require('webpack');
var path = require('path');

let tsPath = path.resolve("./typescript");

module.exports = {
    externals : {
        "jquery" : "jQuery",
        "bootstrap" : "jQuery",
        "lodash" : "_"
    },
    entry: './typescript/gift.ts',
    output: {
        filename: 'wwwroot/js/gift.js'
    },
    resolve: {
        root : tsPath,
        extensions: ['', '.ts']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader', include: [ tsPath ] }
        ]
    }
}