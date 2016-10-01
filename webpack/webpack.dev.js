const loaders = require('./loaders');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var API_KEY = process.env.npm_config_apikey;

module.exports = {
    entry: {
        'polyfills': './src/setup/polyfills.ts',
        'app': './src/setup/dev.bootstrap.ts',
        'css': './src/styles/styles.scss',
        'vendor': [
            '@ngrx/core',
            '@ngrx/store',
            '@ngrx/store-devtools',
            '@ngrx/store-log-monitor',
            '@angular/common',
            '@angular/compiler',
            '@angular/forms',
            '@angular/core',
            '@angular/router',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            'lodash/flatMap',
            'lodash/groupBy',
            'lodash/orderBy',
            'lodash/flatten',
            'rxjs/Observable',
            'rxjs/Subject',
            'rxjs/BehaviorSubject',
            'rxjs/ReplaySubject',
            'rxjs/Subscription',
            'rxjs/add/operator/map',
            'rxjs/add/operator/finally',
            'rxjs/add/operator/filter',
            'rxjs/add/operator/take',
            'rxjs/add/operator/mergeMap',
            'rxjs/add/operator/distinctUntilChanged',
            'rxjs/add/operator/retryWhen',
            'rxjs/add/operator/debounceTime',
            'rxjs/add/operator/do',
            'rxjs/add/operator/switchMap',
            'rxjs/add/observable/combineLatest'
        ]
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js']
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true
        }),
        new StringReplacePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'app', 'css', 'vendor'].reverse()
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ],
    module: {
        loaders: loaders.concat([
            {
                test: /configuration.ts$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: '%API_KEY%',
                            replacement: function () {
                                return API_KEY
                            }
                        }
                    ]
                })
            }
        ])
    }
};