var loaders = require('./loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.ts',
        vendor: [
            'angular2/core',
            'angular2/platform/browser',
            'angular2/http',
            'angular2/common',
            'angular2/router',
            '@ngrx/store',
            'toastr',
            'toastr/build/toastr.css',
            'font-awesome/css/font-awesome.css',
            'bootstrap/dist/css/bootstrap.css',
            'rxjs',
            'lodash'
        ]
    },
    output: {
        filename: './[name].bundle.js',
        path: 'dist',
        publicPath: '/'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: false,
                comments: false
            }
        ),
        new StringReplacePlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')

    ],
    module:{
        loaders: loaders
    }
};