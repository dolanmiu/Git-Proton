var webpack = require('webpack');
var helpers = require('./helpers');

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