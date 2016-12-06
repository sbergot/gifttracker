var webpack = require('webpack');
var path = require('path');

let tsPath = path.resolve("./typescript");

module.exports = {
    externals : {
        "jquery" : "jQuery",
        "bootstrap" : "jQuery",
        "lodash" : "_"
    },
    entry: { 
        maingift : './typescript/main.gift.ts',
        app : './typescript/app.ts'
    },
    output: {
        path : 'wwwroot/js',
        filename: '[name].js'
    },
    resolve: {
        root : tsPath,
        extensions: ['', '.ts', '.vue', '.js']
    },
    module: {
        loaders: [
            // { test: /\.ts$/, loader: 'ts-loader', include: [ tsPath ] },
            { test: /\.ts$/, loader: 'vue-ts', include: [ tsPath ] },
            { test: /\.vue$/, loader: 'vue' }
        ]
    },
    vue: {
      // instruct vue-loader to load TypeScript
      loaders: { js: 'vue-ts-loader', },
      // make TS' generated code cooperate with vue-loader
      esModule: true
    }
}