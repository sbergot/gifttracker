var webpack = require('webpack');

module.exports = {
    externals : {
        "jquery" : "jQuery",
        "bootstrap" : "jQuery"
    },
    entry: './typescript/gift.ts',
    output: {
        filename: 'wwwroot/js/gift.js'
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}