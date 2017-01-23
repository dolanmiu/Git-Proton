var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('[name].css');
var helpers = require('./helpers');

// import 'style!@angular2-material/core/style/core.css';
// import 'style!@angular2-material/core/overlay/overlay.css';

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        },
        {
            test: /\.html$/,
            loader: 'html'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*$|$)/,
            loader: 'file?name=assets/[name].[hash].[ext]'
        },
        {
            test: /\.scss$/,
            exclude: [/node_modules/, /\.global\.scss$/],
            loaders: ['raw-loader', 'sass-loader']
        },
        {
            test: /\.css$/,
            loaders: ['raw-loader', 'css-loader']
        },
        {
            test: /\.global\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }],
    },

    sassLoader: {
        includePaths: [
            helpers.root('src/global-styles'),
            helpers.root('node_modules/@angular')
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        extractCSS,
    ],

    target: "electron-renderer"
};