'use strict'

const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')

module.exports = function compiler (testFile, config, options) {
    config = {
        devtool: config.devtool || 'sourcemap',
        context: '',
        entry: '',
        output: {
            path: '',
            filename: '[name].bundle.js'
        },
        module: {
            rules: config.rules || config.loader
                ? [
                    {
                        test: config.loader.test || /\.(css|scss|sass)$/,
                        use: {
                            loader: path.resolve(__dirname, '../../index.js'),
                            options: config.loader.options || {}
                        }
                    }
                ]
                : []
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: [ 'runtime' ],
                minChunks: Infinity
            })
        ].concat(config.plugins || [])
    }

    options = Object.assign({ emit: false }, options)

    const compiler = webpack(config)

    if (options.watch) {
        return new Promise((resolve, reject) => {
            const watcher = compiler.watch({}, (err, status) => {
                options.watch(err, status, () => {
                    watcher.close(resolve)
                })
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            return compiler.run((err, status) => {
                if (err) {
                    reject(err)
                }
                resolve(status)
            })
        })
    }
    
}