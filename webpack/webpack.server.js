const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { baseDirName, assetsPath, commonLoaders } = require('./webpack.common')

module.exports = {
    name: 'ssr',
    entry: './app/ssr.js',
    output: {
        path: assetsPath,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: nodeExternals(),  
    module: {
        rules: commonLoaders.concat([
            {
                test: /\.css$/,
                include: path.resolve(baseDirName, 'app'),
                exclude: path.resolve(baseDirName, 'node_modules'),
                use: {
                    loader: 'css-loader/locals',
                    options: {
                        modules: true,
                        // importLoaders: 1,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            }
        ])
    }
}
