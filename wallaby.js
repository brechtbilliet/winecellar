var babel = require('babel-core');
var wallabyWebpack = require('wallaby-webpack');
var webpack = require('webpack');

var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        'spec-bundle.js',
        'src/**/*.spec.js'
    ],
    module: {
        loaders: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'raw-loader!sass-loader'
            }
        ]
    }
});

module.exports = function () {
    return {
        files: [
            {pattern: 'spec-bundle.js', load: false, instrument: false},
            {pattern: 'src/**/*.html', load: false, instrument: false},
            {pattern: 'src/**/*.scss', load: false, instrument: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.spec.ts', ignore: true},
            {pattern: 'node_modules/**/*.js', ignore: true, instrument: false}
        ],
        tests: [
            {pattern: 'src/**/*.spec.ts', load: false},
            {pattern: 'node_modules/**/*.js', ignore: true, instrument: false}
        ],
        preprocessors: {
            '**/*.js': file => babel.transform(file.content, {sourceMap: true})
        },
        'testFramework': 'jasmine',
        postprocessor: webpackPostprocessor,
        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
