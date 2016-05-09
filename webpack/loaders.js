module.exports = [
    {
        test: /\.ts$/,
        loader: 'ts-loader',
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
];
