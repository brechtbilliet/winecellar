var StringReplacePlugin = require("string-replace-webpack-plugin");
var API_KEY = process.env.npm_config_apikey;
var BACKEND_ENV = process.env.npm_config_backendenv || "https://winecellarapp.herokuapp.com/api";
if (!API_KEY) {
    throw new Error("provide an apikey for the wine.com database with --apikey=<yourkey>")
}

module.exports = [
    {
        test: /\.ts(x?)$/,
        loader: 'babel-loader!ts-loader',
        include: /src/
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader',
        include: /src/
    }, {
        test: /\.html$/,
        include: /src/,
        loader: 'raw'
    }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
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
    }, {
        test: /config.ts$/,
        loader: StringReplacePlugin.replace({
            replacements: [
                {
                    pattern: '%API_KEY%',
                    replacement: function () {
                        return API_KEY
                    }
                },
                {
                    pattern: '%BACKEND_ENV%',
                    replacement: function () {
                        return BACKEND_ENV
                    }
                }
            ]
        })
    }
];
