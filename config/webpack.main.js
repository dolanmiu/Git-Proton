var webpack = require('webpack');
var helpers = require('./helpers');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    devtool: 'source-map',

    entry: {
        'main': './main/index.ts'
    },

    output: {
        path: helpers.root('dist'),
        publicPath: './',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader']
        }]
    },

    externals: nodeModules,

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main']
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    target: "electron-main"
};