const path = require('path');

module.exports = {
    entry: './test/index.js',
    output: {
        filename: 'di.bundle.js',
        path: path.resolve(__dirname, 'test/js')
    }
}