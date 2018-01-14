const path = require('path');

module.exports = {
    entry: './index.ts',
    output: {
        filename: 'index.js',
    },
    module: {
        rules: [
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    resolve:{
        extensions: ['.ts']
    }
}