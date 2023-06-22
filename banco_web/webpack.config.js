const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/loader.js',
    output: {
        path: __dirname + '/dist',
        filename: './bundle.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
}