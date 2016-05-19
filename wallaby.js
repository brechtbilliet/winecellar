var babel = require('babel-core');
var wallabyWebpack = require('wallaby-webpack');
var webpack = require('webpack');
var loaders = require("./webpack/loaders");
var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        // we need this entrypattern for polyfills
        'wallaby-bundle.js',
        // we need this entrypattern to specify all the test files (compiled by the babel-core)
        'src/**/*.spec.js'
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'raw',
            }, {
                test: /\.html$/,
                include: /src/,
                loader: 'raw'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: '\.jpg$',
                include: /src/,
                loader: 'file'
            }, {
                include: /src/,
                test: '\.png$',
                loader: 'url'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ]
});

module.exports = function (w) {
    return {
        debug: true,
        files: [
            {pattern: 'wallaby-bundle.js', load: false, instrument: false},
            {pattern: 'src/**/*.html', load: false, instrument: false},
            {pattern: 'src/**/*.scss', load: false, instrument: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.spec.ts', ignore: true},
            {pattern: 'src/**/*.builder.ts', load: false, instrument: false},
            {pattern: 'node_modules/**/*.js', ignore: true, instrument: false}
        ],
        tests: [
            {pattern: 'src/**/*.spec.ts', load: false},
            {pattern: 'node_modules/**/*.js', ignore: true, instrument: false}
        ],
        preprocessors: {
            '**/*.js': file => babel.transform(file.content, {sourceMap: true})
        },
        env: {
            runner: require('phantomjs-prebuilt').path,
            params: { runner: '--web-security=false' }
        },

        'testFramework': 'jasmine',
        postprocessor: webpackPostprocessor,
        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
