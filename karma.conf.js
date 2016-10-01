// Karma configuration
var path = require('path');
var cwd = process.cwd();
var loaders = require('./webpack/loaders');
var webpack = require('webpack');
process.env.PHANTOMJS_BIN = 'node_modules/phantomjs-prebuilt/bin/phantomjs';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {pattern: 'spec-bundle.js', watched: false}
        ],
        exclude: [],
        preprocessors: {
            'spec-bundle.js': ['webpack', 'sourcemap'] // the sourcemap is very important if you want to see in which file the error happens
        },
        browserNoActivityTimeout: 60000,
        webpack: {
            devtool: "inline-source-map",
            resolve: {
                root: [path.resolve(cwd)],
                extensions: ['', '.ts', '.js', '.css'],
                alias: {
                    'app': 'app'
                }
            },
            module: {
                loaders: [{
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader',
                    query: {
                        tsconfig: "tsconfig.test.json"
                    }
                }],
                postLoaders: [
                    {
                        test: /^((?!\.spec\.ts).)*.ts$/,
                        exclude: /(node_modules)/,
                        loader: 'istanbul-instrumenter'
                    }
                ]
            },
            stats: {
                colors: true,
                reasons: true
            },
            watch: false,
            debug: true
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            reporters: [
                {
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'html'
                },{
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'cobertura'
                }, {
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'json'
                }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    })
};
