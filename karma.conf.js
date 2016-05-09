// Karma configuration
var path = require('path');
var cwd = process.cwd();
var loaders = require('./webpack/loaders');
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {pattern: 'spec-bundle.js', watched: false}
        ],
        exclude: [],
        preprocessors: {
            'spec-bundle.js': ['webpack']
        },
        webpack: {
            resolve: {
                root: [path.resolve(cwd)],
                modulesDirectories: ['node_modules', 'src'],
                extensions: ['', '.ts', '.js', '.css'],
                alias: {
                    'app': 'app'
                }
            },
            module: {
                loaders: loaders
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
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    })
};
