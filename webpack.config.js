var webpack = require('webpack');
var path = require('path')

var env = 'production';

module.exports = [
    {
        name: 'server',
        entry: "./src/server.js",
        output: {
            path: __dirname,
            filename: "server.js"
        },
        target: 'node',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel'
                },
                { test:  /\.json$/, loader: 'json-loader' },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            })
        ]
    },
    {
        name: 'client',
        entry: "./src/client.js",
        output: {
            path: __dirname,
            filename: "./public/js/app.js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "scss", "sass"]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            })
        ]
    }
];
